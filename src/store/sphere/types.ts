export interface Sphere {
    id: number;
    name: string;
    description: string;
    imageSrc: string;
}

export interface SphereState {
    spheres: Array<Sphere>;
    error: boolean;
}
