import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import ScrollToTop from '../Shared/ScrollToTop'
import Shop from '../Page/Shop'
import UserLayout from '../Layout/UserLayout'
import Home from '../Page/Home'
import UserWithCustomerServices from '../Page/chat/UserWithCustomerServices'
import Hotels from '../Page/Hotels'
import HotelsAndPlaces from '../Page/HotelsAndPlaces'
import HotelsDetails from '../Page/HotelsDetails'
import AvailableRooms from '../Page/AvailableRooms'
import CheckOutPageHotels from '../Page/CheckOutPageHotels'
import Cars from '../Page/Cars'
import CarDetails from '../Page/CarDetails'
// import CheckOutCar from '../Components/Car/CheckOutCar'
import Plan from '../Page/Plan'
import Cart from '../Page/Cart'
import Dashboard from '../Layout/Dashboard'
import Index from '../Page/Dashboard/Index'
import Requests from '../Page/Dashboard/Requests'
import ReviewFinancialReports from '../Page/Dashboard/ReviewFinancialReports'
import CustomerServices from '../Page/Dashboard/CustomerServices'
import UserManagement from '../Page/Dashboard/UserManagement'
import Signup from '../Page/auth/Signup'
import Login from '../Page/auth/Login'
import Forgetpassword from '../Page/auth/Forgetpassword'
import Verifycode from '../Page/auth/Verifycode'
import Setpassword from '../Page/auth/Setpassword'
import Chat from '../Page/chat/Chat'
import ProfileEditPage from '../Page/MyProfile/MyProfile'
import UpdateProfile from '../Page/MyProfile/ProfileForm'
import ChangePasswordProfile from '../Page/MyProfile/ChangePassword'
import MyOrders from '../Page/MyProfile/MyOrders'
import LoginAdmin from '../Page/auth/LoginAdmin'
import Story from '../Page/Dashboard/Story/Story'
import Category from '../Page/Dashboard/Category/Category'
import Products from '../Page/Dashboard/Products/Products'
import Admins from '../Page/Dashboard/Admin/Admins'
import Bus from '../Page/Bus'
import BusDetails from '../Page/BusDetails'
import CheckoutBus from '../Components/Bus/CheckoutBus'
import Flight from '../Page/Flight'
import FlightDetails from '../Page/FlightDetails'
import FareSelection from '../Page/FareSelection'
import CheckoutFlight from '../Components/Flight/CheckoutFlight'
import Train from '../Page/Train'
import TrainDetailss from '../Page/TrainDetailss'
import YourTicket from '../Page/YourTicket'
import CheckoutTrain from '../Components/Train/CheckoutBus'
import BookingDetails from '../Page/BookingDetails'
import PlanDetails from '../Page/PlanDetails'
import PlanCat from '../Page/PlanCat'
import PlanCityCat from '../Page/PlanCityCat'
import PlanCheckOut from '../Page/PlanCheckOut'
const Routing = () => {
  const location = useLocation()
  const isStartDashboard = location.pathname.startsWith('/Dashboard')
  const token = localStorage.getItem('token-matroshka-user')
  const tokenAdmin = localStorage.getItem('token-matroshka-admin')

  return (
    <>
      {!isStartDashboard && token && <UserWithCustomerServices />}
      <ScrollToTop />
      <Routes>
        <Route
          path="/signup"
          element={token ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/login/admin" element={<LoginAdmin />} />
        <Route
          path="/forget-password"
          element={token ? <Navigate to="/" /> : <Forgetpassword />}
        />
        <Route
          path="/verify-code/:email"
          element={token ? <Navigate to="/" /> : <Verifycode />}
        />
        <Route
          path="/set-password/:email"
          element={token ? <Navigate to="/" /> : <Setpassword />}
        />
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/all" element={<HotelsAndPlaces />} />
          <Route path="/hotels/details/:name" element={<HotelsDetails />} />
          <Route path="/hotels/Rooms/all" element={<AvailableRooms />} />
          <Route path="/bus" element={<Bus />} />
          <Route path="/bus-details/:name" element={<BusDetails />} />
          <Route path="/payment-services/bus" element={<CheckoutBus />} />
          <Route path="/train" element={<Train />} />
          <Route
            path="/train-details/:num"
            element={<TrainDetailss />}
          />
          <Route path="/your-ticket" element={<YourTicket />} />
          <Route path="/payment-services/train" element={<CheckoutTrain />} />
          <Route path="/flight" element={<Flight />} />
          <Route path="/flight-details/:name" element={<FlightDetails />} />
          <Route path="/fare-selection" element={<FareSelection />} />
          <Route path="/payment-services/flight" element={<CheckoutFlight />} />
          <Route
            path="/payment-services/hotels"
            // element={!token ? <Navigate to="/" /> : <CheckOutPageHotels />}
            element={<CheckOutPageHotels />}
          />
          <Route path="/car" element={<Cars />} />
          <Route path="/car-details" element={<CarDetails />} />
          {/* <Route
            path="/payment-services/cars"
            element={!token ? <Navigate to="/" /> : <CheckOutCar />}
          /> */}
          {/* <Route path="/plan" element={<Plan />} /> */}
          <Route path="/plan" element={<Plan />} />
          <Route path="/plan/:id" element={<PlanDetails />} />
          <Route path="/plan/ru/:id" element={<PlanCat />} />
          <Route path="/plan/ru/:id/category/:slug" element={<PlanCityCat />} />
          <Route path="/plan/check-out/:id" element={<PlanCheckOut />} />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/cart"
            element={!token ? <Navigate to="/" /> : <Cart />}
          />
          <Route
            path="/user-profile/edit"
            element={!token ? <Navigate to="/" /> : <ProfileEditPage />}
          >
            <Route
              index
              element={!token ? <Navigate to="/" /> : <UpdateProfile />}
            />
            <Route
              path="settings/user-profile/edit/change-password"
              element={!token ? <Navigate to="/" /> : <ChangePasswordProfile />}
            />
            <Route
              path="user-profile/orders"
              element={!token ? <Navigate to="/" /> : <MyOrders />}
            />
          </Route>
        </Route>
        <Route
          path="/Dashboard/support/chat/live-help-and-assistance"
          element={!tokenAdmin ? <Navigate to="/login/admin" /> : <Chat />}
        />
        <Route
          path="/Dashboard"
          element={!tokenAdmin ? <Navigate to="/login/admin" /> : <Dashboard />}
        >
          <Route
            index
            element={!tokenAdmin ? <Navigate to="/login/admin" /> : <Index />}
          />
          <Route
            path="requests"
            element={
              !tokenAdmin ? <Navigate to="/login/admin" /> : <Requests />
            }
          />
          <Route
            path="story"
            element={!tokenAdmin ? <Navigate to="/login/admin" /> : <Story />}
          />
          <Route
            path="Product"
            element={
              !tokenAdmin ? <Navigate to="/login/admin" /> : <Products />
            }
          />
          <Route
            path="Admins"
            element={!tokenAdmin ? <Navigate to="/login/admin" /> : <Admins />}
          />
          <Route
            path="Category"
            element={
              !tokenAdmin ? <Navigate to="/login/admin" /> : <Category />
            }
          />
          <Route
            path="review-financial-reports"
            element={
              !tokenAdmin ? (
                <Navigate to="/login/admin" />
              ) : (
                <ReviewFinancialReports />
              )
            }
          />
          <Route
            path="customer-services"
            element={
              !tokenAdmin ? (
                <Navigate to="/login/admin" />
              ) : (
                <CustomerServices />
              )
            }
          />
          <Route
            path="user-management"
            element={
              !tokenAdmin ? <Navigate to="/login/admin" /> : <UserManagement />
            }
          />
        </Route>
        <Route
          path="booking-details/:bookingNumber"
          element={<BookingDetails />}
        ></Route>
      </Routes>
    </>
  )
}

export default Routing
