import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import Navbar from './Navbar'

const Cart = () => {

    const navigate = useNavigate()
    
    const [products,setProducts] = useState([])
    const [totalCost,setTotalCost] = useState(0)
    const [address,setAddress] = useState("")
    
    //Check if a user is logged in
    useEffect( () =>{

        if(!window.localStorage.getItem('token')){
            navigate("/login")
        }
          
        },[])

        useEffect ( () =>{
        let str = window.localStorage.getItem('token').replace(/["]/g,' ')
        
           fetch(`http://localhost:8080/eshop/cart`, {
            headers: {
                "Authorization": 'Bearer'+str,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"        
          }).then((res) => res.json())
          .then(page => {
            const {
                products,
                totalCost
            } = page;
            setProducts(products)
            setTotalCost(totalCost)
          })
    }, [products])


    const removeItem = async(e) =>{
        let str = window.localStorage.getItem('token').replace(/["]/g,' ')
        try {
            let res = await fetch(` http://localhost:8080/eshop/cart/remove?productId=`+e, {
              headers: {
                  "Authorization": 'Bearer'+str,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              method: "DELETE"
            });
              let resJson = await res.json();
              if (res.status === 200) {
                  navigate('/cart');
              } else {
                  alert("Error")
              }
              } catch (err) {
              console.log(err);
              }
    }

    const handleAddress = (event) =>{
        setAddress(event.target.value)
    }

    const submitOrder = async(e) =>{
       e.preventDefault()
       let str = window.localStorage.getItem('token').replace(/["]/g,' ')
        try {
            let res = await fetch(`http://localhost:8080/eshop/cart/checkout?address=${address}`, {
              headers: {
                  "Authorization": 'Bearer'+str,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              method: "POST"
            });
              let resJson = await res.json();
              if (res.status === 200) {
                alert("order submittes")
                  navigate('/home');
              } else {
                  alert("Error")
              }
              } catch (err) {
              console.log(err);
              }
    }

    return (
        <div>
            <Navbar/>
             <h1>My Cart</h1>
             
            <table table class="table table-active table-striped">

                <thead class = "table-primary">

                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Description</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Options</th>
                    </tr>

                </thead>

                <tbody>
                    {
                        products.map(product => (
                            <tr key={product.productId}>
                                <th scope="row">{product.productId}</th>
                                <td>{product.productDescription}</td>
                                <td>{product.category}</td>
                                <td>{product.productPrice}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button onClick=  {() => removeItem(product.productId)} >Remove from cart</button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>

                </table>
                <label>Total Cost: {totalCost} €</label>

                <form>
                    <label>
                        <input type="text" value={address} onChange={handleAddress}/>
                    </label>
                <button onClick={submitOrder}>Send Order</button>
            </form>

        </div>
    )
}

export default Cart