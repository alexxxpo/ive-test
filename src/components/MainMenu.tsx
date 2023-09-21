import {Menu} from 'antd'
import { NavLink } from 'react-router-dom'

export const MainMenu = () => {
    const items = [
        {
            label: (
                <NavLink to="/">Главная</NavLink>
            ),
            key: 1
        },
        {
            label: (
                <NavLink to="/chart">Графики</NavLink>
            ),
            key: 2
        },
    ]
  return (

        <Menu style={{display: 'flex', background: 'inherit', minWidth: 300}} items={items}/>

  )
}