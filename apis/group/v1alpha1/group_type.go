package v1alpha1

import (
	"reflect"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
)

type GroupSpec struct {
	// Name: Group name
	Name string `json:"name"`

	// Description: group description
	// +optional
	Description string `json:"description,omitempty"`
}

// +kubebuilder:object:root=true

// A Group is a Krateo group API type.
// +kubebuilder:resource:scope=Cluster,categories={managed,krateo,groups}
type Group struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec GroupSpec `json:"spec"`
}

// +kubebuilder:object:root=true

// GroupList contains a list of Group
type GroupList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []GroupList `json:"items"`
}

// Group type metadata.
var (
	GroupKind             = reflect.TypeOf(Group{}).Name()
	GroupGroupKind        = schema.GroupKind{Group: Group, Kind: GroupKind}.String()
	GroupKindAPIVersion   = GroupKind + "." + SchemeGroupVersion.String()
	GroupGroupVersionKind = SchemeGroupVersion.WithKind(GroupKind)
)

func init() {
	SchemeBuilder.Register(&Group{}, &GroupList{})
}
