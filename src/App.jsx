import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Listarticles from "./components/articles/Listarticles";
import Insertarticle from "./components/articles/InsertArticles";
import Editarticle from "./components/articles/Editarticle";
import Viewarticle from "./components/articles/Viewarticles";
import Listcategorie from "./components/categories/Listcategories";
import Insertcategorie from "./components/categories/Insertcategories";
import Editcategorie from "./components/categories/Editcategories";
import Viewcategorie from "./components/categories/Viewcategries";
import Listscategorie from "./components/Scategories/Listscategories";
import Insertscategorie from "./components/Scategories/Insertscategories";
import Viewscategorie from "./components/Scategories/Viewscategries";
import Editscategorie from "./components/Scategories/Editscategories";
import Menu from "./components/Menu";

const App=() =>{
return (
<div>
<Router>
  <Menu/>
<Routes>
<Route path="/articles" element={<Listarticles/>}/>
<Route path="/articles/add" element={<Insertarticle/>}/>
<Route path="/article/edit/:id" element={<Editarticle/>}/>
<Route path="/article/view/:id" element={<Viewarticle/>}/>
<Route path="/categories" element={<Listcategorie/>}/>
<Route path="/categories/add" element={<Insertcategorie/>}/>
<Route path="/categories/edit/:id" element={<Editcategorie/>}/>
<Route path="/categories/view/:id" element={<Viewcategorie/>}/>
<Route path="/scategories" element={<Listscategorie/>}/>
<Route path="/scategories/add" element={<Insertscategorie/>}/>
<Route path="/scategories/edit/:id" element={<Editscategorie/>}/>
<Route path="/scategories/view/:id" element={<Viewscategorie/>}/>
</Routes>
</Router>
</div>
);
}
export default App;
