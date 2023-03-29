import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutButton from './LogoutButton'

const ProductCreateOrUpdate = () => {

    const navigate = useNavigate()
    
    const [productDescription,] = useState("")
    const [productPrice,setProductPrice] = useState("")
    const [category,setCategory] = useState("")

    

    const handleProductDescription = (event) =>{
        setProductDescription(event.target.value)
    }

    const handleProductPrice = (event) =>{
        setProductPrice(event.target.value)
    }

    const handleCategory = (event) =>{
        setCategory(event.target.value)
    }

    //Check if a user is logged in
    useEffect( () =>{

        if(!window.localStorage.getItem('token')){
            navigate("/login")
        }
          
        },[])

        const createProd = async (e) =>{
            let str = window.localStorage.getItem('token').replace(/["]/g,' ');
            e.preventDefault();
            e.preventDefault();
            try {
              let res = await fetch(" http://localhost:8080/eshop/products/create-or-update", {
                headers: {
                    "Authorization": 'Bearer'+str,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    productDescription: productDescription,
                    productPrice: productPrice,
                    category: category
                }),
              });
                let resJson = await res.json();
                
                setProductDescription("")
                setProductPrice("")
                setCategory("")
                if (res.status === 200) {
                    alert("Product Created")
                } else {
                    alert("Error")
                }
                } catch (err) {
                console.log(err);
                }
        }

    return (
        <div>

            <h1>Create Product</h1>
            <LogoutButton/>
            <form>
                <label>Enter Product Description:
                    <input type="text" value={productDescription} onChange={handleProductDescription}/>
                </label>
                <label>Enter Product Price:
                    <input type="text" value={productPrice} onChange={handleProductPrice}/>
                </label>
                <label>Enter Product Category:
                    <input type="text" value={category} onChange={handleCategory}/>
                </label>
                <button onClick={createProd}>Create Product</button>
            </form>
        </div>
    )
}

export default ProductCreateOrUpdate