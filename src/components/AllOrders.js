import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import Navbar from './Navbar'

const AllOrders = () => {

    const navigate = useNavigate()

    const [error, setError] = React.useState(null)
    const [orders, setOrders] = React.useState([])

    const [address, setAddress] = React.useState('')
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

        useEffect ( () =>{
        let str = window.localStorage.getItem('token').replace(/["]/g,' ');
       
           fetch(`http://localhost:8080/eshop/orders?page=${page}&size=${size}&sort=${sort}` + (address ? `&address=${address}` : ''), {
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
            setOrders(content)
            setTotalElements(totalElements)
          })
          .catch(err => setError(err))

          if(error===401){
            alert("error")
            navigate("/")
          }
          
            
    }, [address, page, size, sort, refresh])

    return (
        <div>
            
            <Navbar/>
             <h1>Orders</h1>

             <div className="col">
                <input value={address} onChange={(e) => setAddress(e.target.value)} name="address" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            </div>
            <div className="col-4">
                <select defaultValue={sort} onChange={(e) => { setSort(e.target.value) }} className="form-select" aria-label="Default select example">
                    <option value="ASC">Sort by Total Price: Ascending</option>
                    <option value="DESC">Sort by Total Price: Descending</option>
                </select>
            </div>

            <table className="table table-hover">

                <thead>

                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Address</th>
                        <th scope="col">Total Cost</th>
                        <th scope="col">Status</th>
                        <th scope="col">From</th>
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
                                <td>{order.status.username}</td>
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
                        <span>{'(Total ' + totalElements + ' products)'}</span>
                    </div>
                        <div className="col-3 d-flex justify-content-end">
                            <nav>
                                <ul className="pagination">

                                    <li className={number === 0 ? 'disabled page-item' : 'page-item'}>
                                        <a className="page-link" onClick={(e) => { e.preventDefault(); setPage(number - 1) }}>Previous</a>
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
                                        <a className="page-link" onClick={(e) => { e.preventDefault(); setPage(number + 1) }}>Next</a>
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

export default AllOrders