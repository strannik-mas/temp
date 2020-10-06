<template>
    <v-row justify="center">
        <v-dialog v-model="dialogActivator" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        width="230px"
                >
                    <v-icon>mdi-text-box-plus-outline</v-icon>
                    {{$t('upload_files_modal.btn_show_dialog')}}
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="headline">
                    <span class="headline">{{$t("upload_files_modal.title")}}</span>
                    <v-spacer/>
                    <v-btn icon light @click="dialogActivator = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-file-input
                            v-model="files"
                            color="deep-purple accent-4"
                            :label="$t('upload_files_modal.label')"
                            counter
                            multiple
                            :placeholder="$t('upload_files_modal.description')"
                            prepend-icon="mdi-paperclip"
                            outlined
                            small-chips
                            :show-size="1000"
                    >
                        <template v-slot:selection="{ index, text }">
                            <v-chip
                                    v-if="index < 2"
                                    color="deep-purple accent-4"
                                    dark
                                    label
                                    small
                            >
                                {{ text }}
                            </v-chip>

                                <span
                                        v-else-if="index === 2"
                                        class="overline grey--text text--darken-3 mx-2"
                                >
            +{{ files.length - 2 }} {{$t('upload_files_modal.counter_files')}}
          </span>
                            </template>
                        </v-file-input>

                        <v-layout row wrap v-if="openedAgents.length > 0">
                            <v-flex
                                    xs12
                                    v-for="agent in openedAgents"
                                    :key="agent.id"
                            >
                                <v-checkbox
                                        :value="agent.id"
                                        :label="agent.name"
                                        v-model="agentsSelected"
                                        :hide-details="true"
                                        :style="{
                                                margin: '0 12px'
                                            }"
                                />
                            </v-flex>
                        </v-layout>
                </v-card-text>
                <v-card-text v-if="imgSuccess">
                    <v-img
                        :src="imgSrc"
                        height="40px"
                        width="40px"
                    />
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                            icon
                            :loading="loadingCamera"
                            color="grey"
                            :disabled="loadingCamera"
                            @click="getCameraFile(0)"
                    >
                        <v-icon>mdi-camera</v-icon>
                    </v-btn>
                    <v-btn
                            icon
                            :loading="loadingCameraVideo"
                            color="grey"
                            :disabled="loadingCameraVideo"
                            @click="getCameraFile(1)"
                    >
                        <v-icon>mdi-video</v-icon>
                    </v-btn>
                    <v-btn
                            :loading="loading2"
                            color="primary"
                            :disabled="loading2"
                            @click="uploadFiles"
                    >{{$t("upload_files_modal.btn_upl")}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import i18n from '@/core/plugins/i18n';
import {eventEmitter} from '@/main';

export default {
    props: ['leadId', 'openedAgents'],
    data() {
        return {
            loading2: false,
            files: [],
            dialogActivator: false,
            agentsSelected: [],
            loadingCamera: false,
            loadingCameraVideo: false,
            imgSuccess: false,
            imgSrc: '',
        };
    },
    methods: {
        uploadFiles() {
            this.loading2 = true;
            const selectedFiles = [];
            const openLeads = [];
            for (let i = 0; i < this.agentsSelected.length; i++) {
                openLeads.push(this.openedAgents[i].open_lead_id);
            }
            console.log(this.files);
            for (let i = 0; i < this.files.length; i++) {
                const file = this.files[i];
                const token = localStorage.getItem('token');
                if (file.imgURI !== undefined) {
                    // eslint-disable-next-line no-undef
                    const ft = new FileTransfer();
                    // eslint-disable-next-line no-undef
                    const options = new FileUploadOptions();
                    options.fileKey = 'file';
                    options.fileName = file.imgURI.substr(file.imgURI.lastIndexOf('/') + 1);
                    options.mimeType = file.type;
                    options.httpMethod = 'post';
                    options.headers = {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + token,
                    };
                    options.chunkedMode = false;
                    options.params = {
                        token,
                        //eslint-disable-next-line no-param-reassign,@typescript-eslint/camelcase
                        api_key: process.env.VUE_APP_API_KEY,
                        locale: i18n.locale,
                        openLeads,
                    };

                    //отправка файла
                    const url = encodeURI('https://demo.contact.org.il/api/v2/client/lead/upload/files');
                    ft.upload(file.imgURI, url, (r) => {
                        console.log(r.response);
                        this.loading2 = false;
                    }, (error) => {
                        console.log('An error has occurred: Code = ' + error.code);
                        console.log('upload error source ' + error.source);
                        console.log('upload error target ' + error.target);
                        console.log('http_status ' + error.http_status);
                        console.log('body  ' + error.body);
                        this.loading2 = false;
                    }, options);
                } else {
                    selectedFiles.push(file);
                }
            }
            console.log(selectedFiles);
            if (selectedFiles.length > 0) {
                this.$store.dispatch(
                    'lead/uploadLeadFiles',
                    {id: +this.leadId, files: selectedFiles, agents: this.agentsSelected, openLeads},
                )
                    .then((response) => {
                        console.log(response);
                        if (response.status === 'success') {
                            this.dialogActivator = false;
                            this.files = [];
                            this.agentsSelected = [];
                            eventEmitter.$emit('documentsChanged', {
                                alert: true,
                                alertType: 'success',
                                alertText: i18n.t('lead_details_page.alert_upload_success'),
                            });
                        }
                        this.loading2 = false;
                    })
                    .catch((err) => console.log(err));
            }
        },
        getCameraFile(cameraMediaType) {
            console.log('type: ', cameraMediaType);
            const opts = {
                quality: 100,
                // eslint-disable-next-line no-undef
                sourceType: Camera.PictureSourceType.CAMERA,
                // eslint-disable-next-line no-undef
                destinationType: Camera.DestinationType.FILE_URI,
                // eslint-disable-next-line no-undef
                cameraDirection: Camera.Direction.BACK,
                // eslint-disable-next-line no-undef
                mediaType: cameraMediaType,
                // eslint-disable-next-line no-undef
                //encodingType: Camera.EncodingType.JPEG,
            };
            navigator.camera.getPicture((imgURI) => {
                this.imgSuccess = true;
                //this.imgSrc = imgURI;

                window.resolveLocalFileSystemURI(imgURI, (fileEntry) => {
                    this.imgSrc = fileEntry.toInternalURL();
                    /*const file = fetch(fileEntry.toURL())
                        .then((e) => e.file())
                        .then((blob) => {
                            const b = blob;
                            b.lastModifiedDate = new Date();
                            b.name = 'camera';
                            return b;
                        });
                    console.log(file);
                    console.log(fileEntry);
                    this.files.push(file);
                    const file = this.readFile(fileEntry);
                    file.then(res => this.files.push(res));
                    console.log(file);*/
                    //this.files.push(file);
                    fileEntry.file((file) => {
                        /*file.webkitRelativePath = '';*/
                        // eslint-disable-next-line no-param-reassign
                        file.imgURI = fileEntry.toInternalURL();
                        //file.imgURI = imgURI;
                        console.log(file);
                        console.log(imgURI);
                        console.log(fileEntry.toInternalURL());
                        this.files.push(file);
                        /*const fileObj = Object.create(
                            new File(),
                            Object.getOwnPropertyDescriptors(file),
                        );
                        // eslint-disable-next-line no-param-reassign,no-proto
                        //file.__proto__ = fileObj;
                        //file.setPrototypeOf(file, File);
                        console.log(file);
                        console.log(fileObj);
                        this.files.push(fileObj);

                        const reader = new FileReader();
                        reader.readAsArrayBuffer(file);

                        // reader.onloadend = () => {
                        //     const newFile = new File(reader.result, 'camera.jpg');
                        //     console.log(newFile);
                        //     this.files.push(newFile);
                        // };

                        reader.onerror = function () {
                            console.log(reader.error);
                        };

                        reader.onloadend = (e) => {
                            const imgBlob = new Blob([this.result], {type: 'image/jpeg'});
                            const newFile = new File(imgBlob, 'camera12.jpg');
                            console.log(imgBlob);
                            console.log(newFile);
                            this.files.push(newFile);
                        };
                        //reader.readAsArrayBuffer(file);*/
                    }, (error) => {
                        console.log(error);
                    });
                }, () => {
                    // If don't get the FileEntry (which may happen when testing
                    // on some emulators), copy to a new FileEntry.
                    console.log('err: ' + imgURI);
                });
                /*const file = fetch(imgURI)
                    .then((e) => e.file())
                    .then((blob) => {
                        const b = blob;
                        b.lastModifiedDate = new Date();
                        b.name = 'camera';
                        return b;
                    });
                console.log(file);
                this.files.push(file);*/
            }, (msg) => {
                console.log(msg);
            }, opts);
        },
        readFile(fileEntry) {
            return new Promise((resolve, reject) => {
                fileEntry.file(
                    file => {
                        const reader = new FileReader();
                        reader.readAsArrayBuffer(file);
                        reader.onload = () => resolve(reader.result);
                        reader.onerror = error => reject(error);
                    },
                    err => {
                        reject(err);
                    },
                );
            });
        },
        // eslint-disable-next-line consistent-return
        async getFile(fileEntry) {
            try {
                return await new Promise((resolve, reject) => fileEntry.file(resolve, reject));
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>

<style scoped>

</style>
