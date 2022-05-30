import { toGlobalId } from "graphql-relay"

export const globalIdResolver = (id: number | string, parentType: string) => {
	return toGlobalId(parentType, String(id))
}

export const getTypeName = (parent: any) => {
	if ("$typename" in parent) {
		return parent.$typename
	}
	throw new Error("Cannot find type $typename")
}
