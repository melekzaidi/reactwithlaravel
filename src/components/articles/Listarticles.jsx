import { useEffect, useState } from "react";
import axios  from "axios";
import { Link } from "react-router-dom";
const Listarticles = () => {
    const[articles,setArticles]=useState([])
    const fetcharticles=async()=>{
      try{
        const res=await axios .get("https://backendoho-6xny.vercel.app/api/api/articles")
        setArticles(res.data)
      }catch (error){
        console.log(error)
      }
      }; 
      const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ?")) {
          try {
            await axios.delete(`https://backendoho-6xny.vercel.app/api/api/articles/${id}`);
            setArticle((articles) => articles.filter((art) => art.id !== id));
          } catch (error) {
            console.error(error);
          }
        }
      };
      
         
      useEffect(() => {
        fetcharticles();
        }, []);
    return (
      <div>
        
        <Link to="/articles/add"><button className="btn btn-success"><i className="fa-solid fa-square-plus"></i>Nouveau</button>
       </Link>  
       <center><h2>liste des articles</h2></center>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>reference</th>
              <th>designation</th>
              <th>marque</th>
              <th>quantité</th>
              <th>prix</th>
              <th>image</th>
              <th>update</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {
              articles.map((art,index)=>
              <tr key={index}>
                <td>{art.reference}</td>
                <td>{art.designation}</td>
                <td>{art.marque}</td>
                <td>{art.qtestock}</td>
                <td>{art.prix}</td>
                <td><img src={art.imageart} width={100} height={100} /></td>
                <td><button className="btn btn-warning btn-sm"><i className="fa-solid fa-pen-to-square"></i>Update</button></td>
                <td>
  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(art.id)}>
    <i className="fa-solid fa-trash"></i> Delete
  </button>
</td>
  
              </tr>
              )
  
            }
          </tbody>
        </table>
      </div>
    )
  }
  
  export default Listarticles
  