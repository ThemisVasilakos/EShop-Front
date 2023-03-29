import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import { Form } from 'react-bootstrap'

const Home = () => {

    const navigate = useNavigate()

    const [error, setError] = React.useState(null)
    const [products, setProducts] = React.useState([])

    const [productDescription, setProductDescription] = React.useState('')
    const [page, setPage] = React.useState(0)
    const [size, setSize] = React.useState(3)
    const [sort, setSort] = React.useState("ASC")

    const [totalPages, setTotalPages] = React.useState(0)
    const [number, setNumber] = React.useState(0)
    const [totalElements, setTotalElements] = React.useState(0)
    const [refresh, setRefresh] = React.useState(0)
    
    //Check if a user is logged in
    useEffect( () =>{

        if(!window.localStorage.getItem('token')){
            navigate("/login")
        }
          
        },[])
    
    const addProducts = () =>{
        navigate("/product-create")
    }

    const viewProducts = async (e) =>{
        let str = window.localStorage.getItem('token').replace(/["]/g,' ');
        e.preventDefault();
        e.preventDefault();
       
          let res = await fetch(` http://localhost:8080/eshop/products/all?page=${page}&size=${size}&sort=${sort}` + (productDescription ? `&productDescription=${productDescription}` : ''), {
            headers: {
                "Authorization": 'Bearer'+str,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"        
          }).then((res) => res.json())
          .then(page => {
            const {
              content,
              number,
              totalElements,
              totalPages
            } = page;
            setNumber(number)
            setTotalPages(totalPages)
            setProducts(content)
            setTotalElements(totalElements)
          })
          .catch(err => setError(err))
            
    }

    return (
        <div>

             <LogoutButton/>
             <button onClick={addProducts}>Add Product</button>

             <h1>Products</h1>
             <button onClick={viewProducts}>View Products</button>

             <div className="col">
                <input value={productDescription} onChange={(e) => setProductDescription(e.target.value)} name="productDescription" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            </div>
            <div className="col-4">
                <select defaultValue={sort} onChange={(e) => { setSort(e.target.value) }} className="form-select" aria-label="Default select example">
                    <option value="ASC">Sort by Price: Ascending</option>
                    <option value="DESC">Sort by Price: Descending</option>
                </select>
            </div>

            <table className="table table-hover">

                <thead>

                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product Description</th>
                    <th scope="col">Product Price</th>
                    <th scope="col">Options</th>
                    </tr>

                </thead>

                <tbody>
                    {
                    products.map(product => (
                        <tr key={product.productId}>
                        <th scope="row">{product.productId}</th>
                        <td>{product.productDescription}</td>
                        <td>{product.productPrice}</td>
                        <td>
                            <div className="row" style={{ width: '190px' }}>
                            <div className="col">
                                <a href={`/edit/${product.productId}`} className="btn btn-light">edit</a>
                            </div>
                            </div>
                        </td>
                        </tr>
                    ))
                    }

                </tbody>

            </table>
            
            {
            totalPages > 0 ? (
                <div className="row justify-content-between">
                <div className='col-3'>
                    <Form.Select defaultValue={size} onChange={(e) => setSize(e.target.value)}>
                    <option value={3}>Page size: 3</option>
                    <option value={10}>Page size: 10</option>
                    <option value={20}>Page size: 20</option>
                    </Form.Select>
                </div>
                <div className="col-3 d-flex flex-column justify-content-center align-items-center">
                    <span>{'Now on ' + (number + 1) + ' from total ' + totalPages + ' pages'}</span>
                    <span>{'(Total ' + totalElements + ' people)'}</span>
                </div>
                <div className="col-3 d-flex justify-content-end">
                    <nav>
                    <ul className="pagination">

                        <li className={number === 0 ? 'disabled page-item' : 'page-item'}>
                        <a className="page-link" onClick={(e) => { e.preventDefault(); setPage(number - 1) }}>
                            Previous</a>
                        </li>

                        {
                        number > 0 ? (
                            <li className="page-item">
                            <a className="page-link" onClick={(e) => { e.preventDefault(); setPage(number - 1) }}>{number}</a>
                            </li>
                        ) : null
                        }


                        <li className="page-item active">
                        <a className="page-link" href="#">{number + 1}</a>
                        </li>

                        {
                        number < totalPages - 1 ? (
                            <li className="page-item">
                            <a className="page-link" onClick={(e) => { e.preventDefault(); setPage(number + 1) }}>{number + 2}</a>
                            </li>
                        ) : null
                        }

                        <li className={number === totalPages - 1 ? 'disabled page-item' : 'page-item'}>
                        <a className="page-link" onClick={(e) => { e.preventDefault(); setPage(number + 1) }}>
                            Next</a>
                        </li>
                    </ul>
                    </nav>
                </div>
                </div>
            ) : (
                <div className="row">
                <div className="col text-center"><span>No Data</span></div>
                </div>
            )
        }
       

        </div>
    )
}

export default Home