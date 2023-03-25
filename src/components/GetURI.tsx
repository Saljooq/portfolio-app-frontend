export default function getBackendURI(){

    const backend_uri = import.meta.env.VITE_BACKEND_URI

    if (backend_uri === undefined){
        return "http://localhost:8080"
    } else {
        return backend_uri
    }


}