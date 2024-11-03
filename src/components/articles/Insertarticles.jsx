import axios from "axios";
import { useEffect, useState } from "react"
import { Col, Form, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import { FilePond,registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)
export const Insertarticle = () => {
  const [files, setFiles] = useState([]);
    const[  categories,Setcategories]=useState([]);
    const[  scategories,Setscategories]=useState([]);

  const [articles, setArticles] = useState({})
  const serverOptions = () => { console.log('server pond');
    return {
    process: (fieldName, file, metadata, load, error, progress, abort) => {
    console.log(file)
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'dbcommer');
    data.append('cloud_name', 'djtv9gjuw');
data.append('publicid', file.name);
axios.post('https://api.cloudinary.com/v1_1/djtv9gjuw/image/upload', data)
.then((response) => response.data)
.then((data) => {
console.log(data);
setArticles({...articles,imageart:data.url}) ;
load(data);
})
.catch((error) => {
console.error('Error uploading file:', error);
error('Upload failed');
abort();
});
},
};
};
  const navigate=useNavigate();
  const fetchcategories=async()=>{
    try{
const res=await axios.get("https://backendoho-6xny.vercel.app/api/api/categories");
Setcategories(res.data);
  }catch(error){
    console.log(error)
  }
  }
  const fetchscategories=async()=>{
    try{
const res=await axios.get("https://backendoho-6xny.vercel.app/api/api/scategories");
Setscategories(res.data);
  }catch(error){
    console.log(error)
  }
  }
  const handlesave=async(e)=>{
    try{
        e.preventDefault();
        console.log(articles);
        await axios.post("https://backendoho-6xny.vercel.app/api/api/articles",articles).then(res=>{
          console.log(res);
            navigate("/articles")
        });
    }catch(error){
    
    }
    }
useEffect(()=>{fetchscategories();fetchcategories()},[])

  return (
    <div  className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow">
      <center><h2>Isérer un article</h2></center>
      <Form>
        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Référence</Form.Label>
            <Form.Control 
            type="text"
            placeholder="Référence"
            onChange={(e) => setArticles({...articles, reference: e.target.value})}
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Designation</Form.Label>
            <Form.Control 
            type="text"
            placeholder="Designation"
            onChange={(e) => setArticles({...articles, designation: e.target.value})}
            />
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Marque</Form.Label>
            <Form.Control 
            type="text"
            placeholder="Marque"
            onChange={(e) => setArticles({...articles, marque: e.target.value})}
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Stock</Form.Label>
            <Form.Control 
            type="number"
            placeholder="Stock"
            onChange={(e) => setArticles({...articles, qtestock: e.target.value})}
            />
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Prix</Form.Label>
            <Form.Control 
            type="number"
            placeholder="Prix"
            onChange={(e) => setArticles({...articles, prix: e.target.value})}
            />
          </Form.Group>
        
        </Row>
        <Row className="mb-2">
        <Form.Group as={Col} md="6">
        <Form.Label> Categorie</Form.Label>
        <Form.Control 
          type="select"
          as="select"
          placeholder="Categorie"
          onChange={(e) => setArticles({...articles, sategorieID: e.target.value})}
        > {categories.map((cat,index)=><option value={cat.id}>{cat.nomcategorie}</option>)}
        </Form.Control>
        </Form.Group>

        <Row/>
        <Form.Group as={Col} md="6">
          <Form.Label>Sous Categorie</Form.Label>
          <Form.Control 
          type="select"
          as="select"
          placeholder="sousCategorie"
          onChange={(e) => setArticles({...articles, scategorieID: e.target.value})}
        > {scategories.map((scat,index)=><option value={scat.id}>{scat.nomscategorie}</option>)}
        </Form.Control>
        <div className="form-group">
<label htmlFor="prix">Image</label>
<div style={{ width: "80%", margin: "auto", padding: "1%" }}>
<FilePond

files={files}
acceptedFileTypes="image/*"
onupdatefiles={setFiles}
allowMultiple={true}
server={serverOptions()}
name="file"

/>
</div>
</div>
        </Form.Group>
        </Row>
        <div className="d-flex justify-content-end">
          <button className="btn btn-success btn-sm" onClick={(e)=>handlesave(e)}> <i class="fa-solid fa-plus"></i></button>
         <Link to="/articles">
          <button className="btn btn-danger btn-sm">Annuler</button></Link> 
        </div>
      </Form>
    </div>
  )
}
export default Insertarticle