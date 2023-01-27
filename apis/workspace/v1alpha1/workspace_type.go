package v1alpha1

import (
	"reflect"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
)

type WorkspaceSpec struct {
	// Name: Workspace name
	Name string `json:"name"`

	// Description: workspace description
	// +optional
	Description string `json:"description,omitempty"`
}

// +kubebuilder:object:root=true

// A Workspace is a Krateo workspace API type.
// +kubebuilder:resource:scope=Cluster,categories={managed,krateo,workspaces}
type Workspace struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec WorkspaceSpec `json:"spec"`
}

// +kubebuilder:object:root=true

// WorkspaceList contains a list of Workspace
type WorkspaceList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []WorkspaceList `json:"items"`
}

// Workspace type metadata.
var (
	WorkspaceKind             = reflect.TypeOf(Workspace{}).Name()
	WorkspaceGroupKind        = schema.GroupKind{Group: Group, Kind: WorkspaceKind}.String()
	WorkspaceKindAPIVersion   = WorkspaceKind + "." + SchemeGroupVersion.String()
	WorkspaceGroupVersionKind = SchemeGroupVersion.WithKind(WorkspaceKind)
)

func init() {
	SchemeBuilder.Register(&Workspace{}, &WorkspaceList{})
}
