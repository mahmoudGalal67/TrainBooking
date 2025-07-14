const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-6 h-6 border-4 border-t-4 border-gradient-to-r from-blue-500 via-green-500 to-yellow-500 border-solid rounded-full animate-spin-slow">
        {/* <div className="absolute w-8 h-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full opacity-30 animate-pulse"></div> */}
      </div>
    </div>
  )
}

export default Spinner
