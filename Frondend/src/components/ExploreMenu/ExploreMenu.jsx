import React from 'react'
import "../ExploreMenu/ExploreMenu.css"
import { menu_list } from '../../assets/assets'

export default function ExploreMenu({category,setCategory}) {
  return (
    <div className='exploremenu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur assumenda quis ipsum perferendis fugiat, vel accusamus delectus et minima consectetur voluptatum laboriosam pariatur repellat temporibus, enim ullam labore cumque mollitia.</p>
<div className="explore-menu-list">
    {menu_list.map((item,index)=>{
        return (
          
            <div onClick={()=>setCategory(prev=>prev==item.menu_name?"All":item.menu_name)} className='explore-menu-list-item' key={index}>
                <img className={category==item.menu_name?"active":""} src={item.menu_image} alt="" />
                <p>{item.menu_name}</p>

            </div>
        )
    })}
</div>
<hr />
    </div>
  )
}
