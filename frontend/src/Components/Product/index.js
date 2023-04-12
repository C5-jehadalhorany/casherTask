import React, { useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/auth/index"
import("./style.css")

const ProductAndHistory = () => {
    const [product, setProduct] = useState("");
    const [cart, setCart] = useState([]);
    const [sales, setSales] = useState([]);
    const history = useNavigate();
    const dispatch = useDispatch();



    const { token, roles } = useSelector((state) => {
        return {
            token: state.auth.token,
            roles: state.auth.roles,
        };
    });
    console.log(roles);


    const fetchProducts = () => {
        axios.get("http://localhost:5000/product").then((result) => {
            setProduct(result.data.result)
        }).catch((err) => {
            console.log(err);
        })
    }

    const onClickForProdcut = (ele) => {
        const item = cart.find(item => item.id === ele.id);
        if (item) {
            item.quantity += 1;
            setCart([...cart]);
        } else {
            setCart([...cart, { ...ele, quantity: 1 }]);
        }
    }

    const handlePurchase = () => {
        const purchasedProducts = cart.map(item => ({
            productName: item.productName,
            quantity: item.quantity,
        }));
        let totals = getTotal();
        console.log("Purchased Products: ", purchasedProducts);
        console.log("Total: ", totals);
        setSales([...sales, { purchasedProducts, totals }]);
        setCart([]);
        posthistory();
    };

    const posthistory = () => {
        const purchasedProducts = cart.map(item => ({
            productName: item.productName,
            quantity: item.quantity,
        }));
        const totals = getTotal();
        console.log("Purchased Products: ", purchasedProducts);
        console.log("Total: ", totals);
        axios.post("http://localhost:5000/history", {
            solded: JSON.stringify(purchasedProducts),
            total: totals
        })
            .then((response) => {
                console.log("Purchase history saved successfully");
                console.log("Response data:", response.data);
            })
            .catch((error) => {
                console.log("Error saving purchase history:", error);
            });
    };

    const goToAdminPage = () => {
        history("/admin");
    }


    const getTotal = () => {
        return cart.reduce((acc, item) => {
            return acc + (item.price * item.quantity)
        }, 0)
    }
    const handleLogout = () => {
        dispatch(logout());
        history("/login")
    };

    useEffect(() => {
        fetchProducts()
    }, [])


    return (
        <div className="for__all">
            <div className="for__prod">
                {product && product.map((ele, ind) => {
                    return (
                        <div
                            className="to__get__prodcut"
                            key={ind}
                            onClick={() => onClickForProdcut(ele)}
                        >
                            <div className="contaner">
                                <div className="product__name">{ele.productName}</div>
                                <div className="prodcut__price">{ele.price}</div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <Table bordered hover>
                <thead className="t__head">
                    <tr>
                        <th>#</th>
                        <th>الأسم</th>
                        <th>السعر</th>
                        <th>الكمية</th>
                        <th>المجموع</th>
                        <th>حذف منتج</th>
                    </tr>
                </thead>
                <tbody className="t__body">
                    {cart.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.productName}</td>
                            <td>{item.price}</td>
                            <td onClick={() => {
                                item.quantity = 2;
                                setCart([...cart])
                            }}>{item.quantity}</td>
                            <td>{item.price * item.quantity}</td>
                            <td><button className="delete-icon" onClick={() => {
                                const newCart = cart.filter(x => x.id !== item.id);
                                setCart(newCart);
                            }}> <span

                                onClick={() => {
                                    const newCart = cart.filter(x => x.id !== item.id);
                                    setCart(newCart);
                                }}>
                                    X
                                </span></button></td>
                        </tr>
                    ))}
                    <tr className="sum__table">
                        <td colSpan={4}>المجموع:</td>
                        <td colSpan={2}>{getTotal() === 0 ? "0.00" : getTotal()}</td>

                    </tr>
                </tbody>
            </Table>


            <button className="purchase-btn" onClick={handlePurchase}>
                إتمام الشراء
            </button>

            {roles == 1 ? <div>
                <button className="admin-btn" onClick={goToAdminPage}>
                    صفحة الأدمن
                </button></div> : <></>
            }

            <button className="logout-button2" onClick={handleLogout}>
                تسجيل الخروج
            </button>

        </div>
    )

}
export default ProductAndHistory;