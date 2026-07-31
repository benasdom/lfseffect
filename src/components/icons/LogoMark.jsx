import { motion } from 'framer-motion'
import logo from '../assets/img/lfs-favicon-180x180.png'
export default function LogoMark({ className = '' }) {
  return (
    <img src={logo} alt="logo"/>
  )
}
