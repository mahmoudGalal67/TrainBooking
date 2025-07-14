import { configureStore } from '@reduxjs/toolkit'
import { UserApi } from './Feature/API/User'
import { ShopApi } from './Feature/API/Shop'
import { ChatApi } from './Feature/API/Chat'
import { PaymentApi } from './Feature/API/Payment'
import { CarApi } from './Feature/API/Car'
import { ShowUserApi } from './Feature/API/Admin/ShowUsers'
import { StoryApi } from './Feature/API/Admin/Story'
import { ProductApi } from './Feature/API/Admin/Product'
import { HotelsApi } from './Feature/API/Hotels'
import { PlanApi } from './Feature/API/Plan'
import { TrainApi } from './Feature/API/Train'

const store = configureStore({
  reducer: {
    [UserApi.reducerPath]: UserApi.reducer,
    [ShopApi.reducerPath]: ShopApi.reducer,
    [ChatApi.reducerPath]: ChatApi.reducer,
    [PaymentApi.reducerPath]: PaymentApi.reducer,
    [CarApi.reducerPath]: CarApi.reducer,
    [ShowUserApi.reducerPath]: ShowUserApi.reducer,
    [StoryApi.reducerPath]: StoryApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    [HotelsApi.reducerPath]: HotelsApi.reducer,
    [PlanApi.reducerPath]: PlanApi.reducer,
    [TrainApi.reducerPath]: TrainApi.reducer,
  },
  middleware: (gDM) =>
    gDM().concat(
      UserApi.middleware,
      ShopApi.middleware,
      ChatApi.middleware,
      PaymentApi.middleware,
      CarApi.middleware,
      ShowUserApi.middleware,
      StoryApi.middleware,
      ProductApi.middleware,
      HotelsApi.middleware,
      PlanApi.middleware,
      TrainApi.middleware
    ),
})

export default store
