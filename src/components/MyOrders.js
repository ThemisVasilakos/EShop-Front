import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom'
import React,{ useEffect,useState } from 'react';

function MyOrders() {
    const navigate = useNavigate()

    useEffect( () =>{

      if(!window.localStorage.getItem('token')){
          navigate("/login")
      }
        
      },[])

      const [orders,setOrders] = useState([])
      const [error, setError] = React.useState(null)

      useEffect ( () =>{
      let str = window.localStorage.getItem('token').replace(/["]/g,' ');
     
         fetch(` http://localhost:8080/eshop/orders/user`, {
          headers: {
              "Authorization": 'Bearer'+str,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          method: "GET"        
        }).then((res) => res.json())
        .then(page => {
          const {
            orders
          } = page;
          setOrders(page);
        })
        .catch(err => setError(err))
        
          
  }, [orders])


  return (
    <>
      <Navbar/>
      <h1>My Orders</h1>

      <table class="table table-active table-striped">

                <thead class = "table-primary">

                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Address</th>
                        <th scope="col">Total Cost</th>
                        <th scope="col">Status</th>
                    </tr>

                </thead>

                <tbody>
                    {
                        orders.map(order => (
                            <tr key={order.ordersId}>
                                <th scope="row">{order.ordersId}</th>
                                <td>{order.address}</td>
                                <td>{order.totalCost}</td>
                                <td>{order.status}</td>
                            </tr>
                        ))
                    }

                </tbody>

            </table>

    </>
  );
}

export default MyOrders;