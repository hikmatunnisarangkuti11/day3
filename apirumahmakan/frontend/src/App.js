import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";
import EditTransaction from "./components/EditTransaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="add" element={<AddProduct/>}/>
        <Route path="edit/:id" element={<EditProduct/>}/>
        <Route path="transaction" element={<TransactionList/>}/>
        <Route path="transaction/add" element={<AddTransaction/>}/>
        <Route path="transaction/edit/:id" element={<EditTransaction/>}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
