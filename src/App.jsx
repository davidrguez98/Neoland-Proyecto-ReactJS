import { Routes, Route } from "react-router";

import './index.css'

import { PageTemplate } from './components/PageTemplate'
import { HomePage } from './pages/home.page'
import { ProductsProvider } from "./context/products.context";


function App() {

  return (
    <>
      <ProductsProvider>
        <PageTemplate>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/dashboard" element={<PanelControl />} />
            <Route path="/products/:id" element={<Producto />} /> */}
          </Routes>
        </PageTemplate>
      </ProductsProvider>
    </>
  )
}

export default App
