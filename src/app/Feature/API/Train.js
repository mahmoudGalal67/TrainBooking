import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const TrainApi = createApi({
  reducerPath: 'TrainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://matroshka-travel.com/proxy-onelya/',
    prepareHeaders: (header) => {
      header.set('Pos', 'aviation_test')
      const username = 'aviation_test'
      const password = 'Matroshka@123'
      const value = btoa(`${username}:${password}`)
      header.set('Authorization', `Basic ${value}`)
      header.set('Content-Type', 'application/json')
      return header
    },
  }),

  tagTypes: ['Train'],
  endpoints: (build) => ({
    transportNodes: build.query({
      query: () => ({
        url: 'Info/V1/References/TransportNodes',
        method: 'POST',
        body: {
          LastUpdated: null,
          Type: 'RailwayStation',
          IncludeInvisible: null,
        },
      }),
    }),
    railwaySearch: build.mutation({
      query: (data) => ({
        url: 'Railway/V1/Search/TrainPricing',
        method: 'POST',
        body: {
          CarGrouping: 'DontGroup',
          SpecialPlacesDemand: 'NoValue',
          GetOnlyCarTransportationCoaches: false,
          GetOnlyNonRefundableTariffs: false,
          BonusCardNumber: null,
          ExcludeProviders: null,
          Origin: '2060000', // Kazan
          Destination: '2044000', // Yekaterinburg
          DepartureDate: '2025-08-08',
          TimeFrom: 0,
          TimeTo: 23,
          GetByLocalTime: false,
          IsPriorityReservation: false,
        },
      }),
    }),
    CarPricing: build.mutation({
      query: (data) => ({
        url: 'Railway/V1/Search/CarPricing',
        method: 'POST',
        body: {
          OriginCode: data.OriginCode,
          DestinationCode: data.DestinationCode,
          DepartureDate: data.DepartureDate,
          TrainNumber: data.TrainNumber,
          CarType: null,
          TariffType: 'Full',
          Provider: data.Provider,
          // SpecialPlacesDemand: null,
          IsPriorityReservation: false,
        },
      }),
    }),
    ReservationCreate: build.mutation({
      query: (bookingdata) => ({
        url: 'Order/V1/Reservation/Create',
        method: 'POST',
        body: {
          ContactPhone: bookingdata.phone, // must be valid phone
          ContactEmails: [bookingdata.email],
          RefuseToReceiveAutomaticRoundTripDiscountForRailwayTickets: false,
          Customers: [
            ...bookingdata.clients.map((client, i) => ({
              $type:
                'ApiContracts.Order.V1.Reservation.OrderFullCustomerRequest, ApiContracts',
              Index: i + 1,
              FirstName: client.name,
              LastName: client.name,
              MiddleName: client.name,
              Sex: client.gender,
              CitizenshipCode: client.Nationality,
              DocumentType:
                client.Nationality != 'RU'
                  ? 'ForeignPassport'
                  : 'RussianPassport',
              DocumentNumber: client.Document_number,
              DocumentValidTill: null,
              Birthday: '2025-07-03',

              BirthPlace: null,
            })),
          ],

          ReservationItems: bookingdata.clients.map((client, i) => ({
            $type:
              'ApiContracts.Railway.V1.Messages.Reservation.RailwayReservationRequest, ApiContracts',
            OriginCode: bookingdata.OriginCode,
            DestinationCode: bookingdata.DestinationCode,
            DepartureDate: bookingdata.DepartureDate,
            TrainNumber: bookingdata.TrainNumber,
            CarNumber: bookingdata.CarNumber,
            CarType: bookingdata.CarType,
            ServiceClass: bookingdata.ServiceClass,
            Provider: bookingdata.Provider,
            CabinGenderKind: 'NoValue',
            CarStorey: 'NoValue',
            CabinPlaceDemands: 'NoValue',
            SetElectronicRegistration: false,
            Bedding: null,
            OnRequestMeal: false,
            InternationalServiceClass: null,
            AdditionalPlaceRequirements: 'NoValue',
            PaymentKind: 'NoValue',
            PaymentMethod: 'Confirm',
            ProviderPaymentForm: 'Cash',
            GiveAdditionalTariffForChildIfPossible: false,
            SpecialPlacesDemand: 'NoValue',
            PlacesRequestType: null,
            RelatedBlankNumber: null,
            BookingAdditionalParameters: null,
            Index: i + 1,
            Places: [
              {
                PlaceNumber: bookingdata.seats[i],
                // PlaceType: 'Lower',
                // IsSide: false,
              },
            ],
            Passengers: [
              {
                OrderCustomerIndex: i + 1,
                Phone: '+79991234567',
                ContactEmail: client.email,
                ContactEmailOrPhone: client.email,
                IsNonRefundableTariff: false,
                PreferredAdultTariffType: 'Full',
                Category: client.type,
                PassengerType: 'Usual',
                TransitDocument: 'NoValue',
                RefuseToReceiveAutomaticSpecialTariff: false,
                IsDisabledPerson: false,
                IsDisabledPersonDocumentIsOnPaper: false,
                LastName: client.name,
                FirstName: client.name,
                MiddleName: client.name,
                Birthday: '2025-07-03',
                Sex: client.gender,
                CitizenshipCode: client.Nationality,
                DocumentType:
                  client.Nationality !== 'RU'
                    ? 'ForeignPassport'
                    : 'RussianPassport',
                DocumentNumber: client.Document_number,
              },
            ],
          })),
          CheckDoubleBooking: null,
          PaymentRemark: null,
          WaitListApplicationId: null,
          PushNotificationUrl: null,
        },
      }),
    }),
  }),
})

export const {
  useTransportNodesQuery,
  useRailwaySearchMutation,
  useCarPricingMutation,
  useReservationCreateMutation,
} = TrainApi
