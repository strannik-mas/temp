export interface Sphere {
    id: number;
    name: string;
    description: string;
    imageSrc: string;
}

export interface SphereArr {
    sphere: Sphere;
    attributes?: Array<any>;
}

export interface SphereState {
    spheres: Array<SphereArr>;
    error: boolean;
}
