 import Vue from 'vue';
 import axios from 'axios';

 Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios.create({
            baseURL: "https://shop-list-2023-ad54b-default-rtdb.firebaseio.com/",
            headers: {
                "Authorization":"abc123"
            }
        });

        Vue.prototype.$http.interceptors.request.use(
            (config) => {
              console.log(config.method);
              //   if (config.method == "post") {
              //     config.method = "put";
              return config;
            },
            (error) => Promise.reject(error)
          );
    }
 })