import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup';

const FormReaction = () => {

    const method = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(yup.object().shape({
            danhGia: yup.string().required('Please input')
        }))    
    })

    const {handleSubmit, watch, formState: {errors}, register} = method;

    const danhGia = (data) => {
        console.log('đánh giá', data?.danhGia) 
    }

  return (
    <FormProvider {...method}>
        <form onSubmit={handleSubmit(danhGia)}>
            <input {...register('danhGia')}/>
            <button>Đánh giá</button>
        </form>
    </FormProvider>
  )
}

export default FormReaction