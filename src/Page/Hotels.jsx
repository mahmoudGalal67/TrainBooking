import Banner from '../Components/Hotels/Banner'

const Hotels = () => {
  // const sectionView = useRef()
  // const handleScroll = () => {
  //   if (sectionView.current) {
  //     const el =
  //       sectionView.current.getBoundingClientRect().top + window.scrollY - 90
  //     window.scrollTo({
  //       top: el,
  //       behavior: 'smooth',
  //     })
  //   }
  // }

  return (
    <>
      <Banner />
      {/* <div ref={sectionView}>
        <RecentlyViewed />
      </div> */}
    </>
  )
}

export default Hotels
