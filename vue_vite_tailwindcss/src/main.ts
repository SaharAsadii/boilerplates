import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";



const app = createApp(App);

library.add(faEdit, faTrash);

app.use(createPinia());
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);


app.mount("#app");
