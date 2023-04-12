import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import './style.css'

const GetHistory = () => {
    const [history, setHistory] = useState([]);

    const { token, roles } = useSelector((state) => {
        return {
            token: state.auth.token,
            roles: state.auth.roles,
        };
    });
    const gethistory = () => {
        axios.get("http://localhost:5000/history")
            .then((result) => {
                console.log(result.data.result);
                setHistory(result.data.result);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
       
        if (roles !== '1') { 
            window.location.href = '/';
        } else {
            gethistory(); 
        }
    }, []);

    
    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>رقم الفاتورة</th>
                        <th>مبيعات</th>
                        <th>الأجمالي</th>
                    </tr>
                </thead>
                <tbody>
                    {history && history.map((ele, ind) => {
                        let result = '';
                        if (ele.solded) {
                            let items = decodeURIComponent(ele.solded).split('productName');
                            for (let i = 1; i < items.length; i++) {
                                let [name, qty] = items[i].split('quantity');
                                name = name.replace(/[^0-9\u0600-\u06FF]/g, '').trim();
                                qty = qty.replace(/[^0-9\u0600-\u06FF]/g, '').trim();
                                result += `${name} ${qty} `;
                            }
                        }
                        return (
                            <tr key={ind}>
                                <td>{ind}</td>
                                <td>{result.trim()}</td>
                                <td>{" دينار"+ele.total }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>


            <button onClick={() => window.history.back()} className="btn btn-primary">العودة للخلف</button>

        </div>
    )
};

export default GetHistory;
