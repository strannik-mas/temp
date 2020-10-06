import store from '../store';
import AuthGuard from './auth_guard';

export default function (to: any, from: any, next: any) {
    const sphere = store.getters['sphere/sphereById'](+to.params.id);
    console.log(sphere.attributes);
    //если у сферы нет параметров - догружаем их с сервера
    if (sphere.attributes === undefined) {
        store.dispatch('sphere/setSphereAttributes', {id: +to.params.id}).then(() => {
            const newSphere = store.getters['sphere/sphereById'](+to.params.id);
            if (newSphere.attributes !== undefined) {
                //next();
                AuthGuard(to, from, next);
            }
        })
            .catch((err) => console.log(err));
    } else {
        AuthGuard(to, from, next);
    }
}
