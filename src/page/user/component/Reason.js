import {Icon} from '../../../assets/icon/index';
import { useTranslation } from 'react-i18next';

export const Reason = (props) => {

    const {t} = useTranslation();

    const API = [
        {
            image: 'https://ik.imagekit.io/tvlk/image/imageResource/2017/05/10/1494407528373-a0e2c450b5cfac244d687d6fa8f5dd98.png?tr=h-150,q-75,w-150',
            title: `${t('priceCheap')}`,
        },
        {
            image: 'https://ik.imagekit.io/tvlk/image/imageResource/2017/05/10/1494407541562-61b4438f5439c253d872e70dd7633791.png?tr=h-150,q-75,w-150',
            title: `${t('help24/7')}`,
        },
        {
            image: 'https://ik.imagekit.io/tvlk/image/imageResource/2017/05/10/1494407562736-ea624be44aec195feffac615d37ab492.png?tr=h-150,q-75,w-150',
            title: `${t('feelbackReal')}`,
        },
    ]

    const renderReason = () => {
        return API.map((item, index)=> {
            return <div className="flex flex-col items-center" key={index}>
                <img src={item.image}/>
                <p className="font-500 text-[12px] md:text-[16px]">{item.title}</p>
            </div>
        })
    }

    return (
        <div className="flex flex-col items-center py-[20px] lg:py-[40px] xl:py-[50px] px-[10px] w-full">
            <div className='flex items-center mb-[40px] bg-[#000] w-fit py-[5px] px-[30px] justify-center rounded-tl-[100px] rounded-br-[100px]'>
                <Icon name="check" color="fff"/>
                <h3 className='text-[18px] md:text-[22px] ml-[20px] font-[500] text-[#fff]'>Lý do bạn nên chọn chúng tôi</h3>
            </div>
            <div className="grid grid-cols-3 gap-[20px]">
                {
                    renderReason()
                }
            </div>
        </div>
    )
}