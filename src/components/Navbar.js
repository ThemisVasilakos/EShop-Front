import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

function ColorSchemesExample() {

    const navigate = useNavigate()

    const [role,setRole] = useState("")
    const [admin,setAdmin] = useState(0)
    const [count, setCount] = useState(0);

    useEffect ( () =>{
      
      let str = window.localStorage.getItem('token').replace(/["]/g,' ');
     
         fetch(`http://localhost:8080/eshop/role`, {
          headers: {
              "Authorization": 'Bearer'+str
          },
          method: "GET"        
        }).then(response => response.text())
        .then((response) => {
          setRole(response)
         })
          console.log(role)
          
          if(role === "ROLE_ADMIN"){
            setAdmin(1)
          }
          setCount(count);

        }, [])

    useEffect( () =>{

        if(!window.localStorage.getItem('token')){
            navigate("/login")
        }
          
        },[])

    const logout = () =>{
        window.localStorage.removeItem('token');
        navigate("/login")
    }

    const addProduct = () =>{
        navigate("/product-create")
    }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">E-Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Products</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link href="/myorders">My Orders</Nav.Link>
            <Nav.Link href="/orders">All Orders</Nav.Link>
            <Nav.Link href="/product-create">Add Product</Nav.Link>
            <Button variant="secondary" onClick={logout} className="mr-2">Log Out</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
