const express = require('express')
const cors = require('cors')({ origin: true, credentials: true })
const k8s = require('@kubernetes/client-node')
const request = require('request')
const yaml = require('js-yaml')

const logger = require('./logger')

const app = express()
app.use(cors)
app.use(express.json())

const kc = new k8s.KubeConfig()
kc.loadFromDefault()

const opts = {}
kc.applyToRequest(opts)

app.get('/ping', async (req, res, next) => {
  res.status(200).json({ message: 'permission-lab' })
})

app.get('/:namespace', async (req, res, next) => {
  logger.info('GET /')

  const api = `/apis/krateo.io/v1alpha1/namespaces/${req.params.namespace}/workspaces`
  const url = encodeURI(`${kc.getCurrentCluster().server}${api}`)

  await new Promise((resolve, reject) => {
    request(url, opts, (error, response, data) => {
      logger.debug(response)
      if (error || response.statusCode !== 200) {
        logger.error(error)
        reject(error)
      } else resolve(data)
    })
  })
    .then((data) => {
      logger.debug(data)
      const workspaces = yaml.load(data).items.map((w) => {
        return {
          name: w.spec.name,
          description: w.spec.description
        }
      })

      res.status(200).json(workspaces)
    })
    .catch((error) => {
      logger.error(error)
      res.status(500).json({ message: 'Error reading workspaces' })
    })
})

app.post('/:namespace', async (req, res, next) => {
  logger.info('POST /')

  const api = `/apis/krateo.io/v1alpha1/namespaces/${req.params.namespace}/workspaces`
  const url = encodeURI(`${kc.getCurrentCluster().server}${api}`)

  await new Promise((resolve, reject) => {
    request.post(
      url,
      {
        ...opts,
        json: {
          apiVersion: 'krateo.io/v1alpha1',
          kind: 'Workspace',
          metadata: {
            name: req.body.name.replace(/\s/g, '-').toLowerCase()
          },
          spec: {
            name: req.body.name,
            description: req.body.description
          }
        }
      },
      (error, response, data) => {
        logger.debug(response)
        if (error || response.statusCode !== 201) {
          logger.error(error)
          reject(error)
        } else resolve(data)
      }
    )
  })
    .then((data) => {
      logger.debug(data)
      res.status(200).json({ message: 'Workspace created' })
    })
    .catch((error) => {
      logger.error(error)
      res.status(500).json({ message: 'Error creating workspace' })
    })
})

app.patch('/:namespace/:name', async (req, res, next) => {
  logger.info('PATCH /')

  const api = `/apis/krateo.io/v1alpha1/namespaces/${req.params.namespace}/workspaces`
  const url = encodeURI(`${kc.getCurrentCluster().server}${api}`)

  await new Promise((resolve, reject) => {
    request.patch(
      url + '/' + req.params.name + '?fieldManager=workspace-manager',
      {
        ...opts,
        headers: {
          ...opts.headers,
          'Content-Type': 'application/merge-patch+json'
        },
        json: {
          spec: {
            description: req.body.description
          }
        }
      },
      (error, response, data) => {
        logger.debug(response)
        if (error || response.statusCode !== 200) {
          logger.error(error)
          reject(error)
        } else resolve(data)
      }
    )
  })
    .then((data) => {
      logger.debug(data)
      res.status(200).json({ message: 'Workspace patched' })
    })
    .catch((error) => {
      logger.error(error)
      res.status(500).json({ message: 'Error updating workspace' })
    })
})

app.delete('/:namespace/:name', async (req, res, next) => {
  logger.info('DELETE /')

  await new Promise((resolve, reject) => {
    request.delete(
      url + '/' + req.params.name,
      opts,
      (error, response, data) => {
        logger.debug(response)
        if (error || response.statusCode !== 200) {
          logger.error(error)
          reject(error)
        } else resolve(data)
      }
    )
  })
    .then((data) => {
      logger.debug(data)
      res.status(200).json({ message: 'Workspace deleted' })
    })
    .catch((error) => {
      logger.error(error)
      res.status(500).json({ message: 'Error deleting workspace' })
    })
})

module.exports = app
