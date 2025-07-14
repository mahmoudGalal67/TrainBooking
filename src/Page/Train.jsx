import BannerTrain from '../Components/Train/BannerBus'
import ResultTrain from '../Components/Train/ResultBus'
import { RailwayContext } from '../context/railwayContext'

const Train = () => {
  return (
    <>
      <BannerTrain />
      <ResultTrain />
    </>
  )
}

export default Train
