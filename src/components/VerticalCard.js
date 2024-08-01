import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import diaplayCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'

const VerticalCard = ({loading, data = []}) => {

    const loadingList = new Array(13).fill(null)
    const {fetchUserAddToCart} = useContext(Context)

    const handleAddToCart = async(e,id) =>{
      await addToCart(e,id)
      fetchUserAddToCart()
    }
  return (
    <div className=' grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>


    {
      loading?(
        loadingList.map((product,index)=>{
          return(
              <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] border border-black md:max-w-[320px]  bg-white rounded-sm shadow '>
                  <div className='bg-[#FED8B1] h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                  </div>
                  <div className='p-4 grid gap-3'>
                      <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                      <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                      <div className='flex gap-3'>
                          <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                          <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                      </div>
                      <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                  </div>
              </div>
          )
      })
      ):(
        data.map((product, index)=>(  
          <Link to={"/product/"+product?._id} className='w-full min-w-[280px] md:min-w-[300px] max-w-[280px] md:max-w-[300px] rounded-sm shadow border border-black' onClick={scrollTop}>
              <div className='bg-[#FED8B1] h-48 flex justify-center items-center p-4 min-w-[280px] md:min-w-[145px]'>
                  <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all '/> 
              </div>

              <div className='p-4 grid gap-3  bg-[#ECB176] border border-black'>
                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                
                <p className='capitalize text-[#6F4E37'>{product?.category}</p>
                
                <div className='flex gap-3'>
                  <p className='text-black font-medium'>{diaplayCurrency(product?.sellingPrice)}</p>
                  <p className='text-[#3F2305] line-through'>{diaplayCurrency(product?.price)}</p>
                </div>

                <button className='text-sm border-black bg-[#6F4E37] hover:bg-[#3F2305] text-white px-3 py-0.5 rounded-full'
                  onClick={(e)=>handleAddToCart(e,product?._id)}
                >Add to Cart</button>
              
              </div>

            </Link>
        ))
      )
      
    }
    </div>
  )
}

export default VerticalCard