import { DatePicker } from 'antd'
import { Icon } from 'assets/icon'
import React from 'react'
import { Controller } from 'react-hook-form'
import dayjs from 'dayjs';
import moment from 'moment';

const FormDatePicker = ({ label, control, name, disable, type, required, errors, onChange, inputProps, max }) => {
    return (
        <div className="flex flex-col items-start">
            <h5 className="mb-[5px]">{label} {required && <span className="text-[red]">*</span>}</h5>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value, ref } }) => {
                    console.log('value', value)
                    return (
                        <DatePicker disabledDate={d => !d || d.isAfter(max + 1)} value={value && dayjs(new Date(value).toLocaleDateString("en-GB"), 'DD-MM-YYYY') } onChange={(data)=>onChange(data?.$d)} onBlur={onBlur} {...inputProps} />
                    )

                }}
            />
        </div>
    )
}

export default FormDatePicker