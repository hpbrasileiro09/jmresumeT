
import { useContext } from 'react'

import ContextoCategories from '../contexts/ContextoCategories'

const useCategories = () => useContext(ContextoCategories)

export default useCategories
