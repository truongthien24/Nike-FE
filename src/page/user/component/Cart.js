import { Icon } from 'assets/icon'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { COLOR } from '../shareComponent/constant'
import { checkLogin } from '../shareComponent/Function/checkLogin'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'

const Cart = () => {

    const navigate = useNavigate();

    const jwt = localStorage.getItem("jwt");

    const userInfo = useMemo(() => {
        if (jwt) {
            const jwtDC = jwtDecode(jwt);
            return jwtDC?.users;
        }
    }, [jwt]);

    const handleClick = () => {
        if (checkLogin()) {
            navigate('/cart/1231332132');
        } else {
            // Swal.fire({
            //     icon: 'info',
            //     text: 'Rất tiếc! Bạn chưa đăng nhập',
            //     showConfirmButton: false,
            //     timer: 3000,
            //     timerProgressBar: true
            // })
            toast.error('Rất tiếc! Bạn chưa đăng nhập');
        }
    }


    return (
        <button className='relative' onClick={handleClick}>
            <Icon name="cart" color={COLOR.primaryColor} />
            <div className='text-[#fff] p-[2px] min-w-[20px] box-border text-[10px] rounded-[50%] flex items-center justify-center absolute top-0 left-[70%] bg-[#498374]'>1</div>
        </button>
    )
}

export default Cart