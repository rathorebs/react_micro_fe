import { gql } from "@apollo/client";

export const ALL_SERVICES = gql`
  query ServiceList($search: String, $limit: Int, $offset: Int) {
    serviceList(search: $search, limit: $limit, offset: $offset) {
      page
      pages
      totalRecord
      hasNext
      hasPrev
      objects {
        id
        name
        photo
        classCount
        barChartColor
        classSet {
          id
          name
        }
      }
    }
  }
`;

export const DASHBOARD_DOUGHNUT_BAR_GRAPH = gql`
  query CorporateDashboard($basis: String!) {
    corporateDashboard(basis: $basis) {
      viewYourEngagement {
        labels
        data {
          label
          borderColor
          fill
          data
        }
        dates
        totalSessionAttendeeCount
        engagedEmployeeCount
      }
      employeesWellbeingPlans {
        totalEmployees
        labels
        data
        backgroundColor
        hoverBackgroundColor
      }
      sessionPerMonth {
        labels
        data
        borderColor
        backgroundColor
        services {
          id
          name
          barChartColor
        }
      }
    }
  }
`;

export const GET_CORPORATE_COMPANY_BY_ID = gql`
  query corporateCompany($id: ID!) {
    corporateCompany(id: $id) {
      id
      name
      photo
      billingEmail
      subscription
      individualCreditsPerEmployee
      subscriptionProduct {
        name
        cost
        currency
      }
      noOfSeats
      seatsLeft
      seatsUsed
      nextPayment
      companylocationSet {
        id
        location
        corporatecompanyadminSet {
          admin {
            userdetailObj {
              userObj {
                firstName
                lastName
                email
              }
            }
          }
        }
      }
      corporatecompanyadminSet {
        id
        admin {
          id
          userdetailObj {
            photo
            userObj {
              firstName
              lastName
              email
            }
            role {
              id
              name
            }
          }
        }
        location {
          id
          location
        }
      }
      studentdetailSet {
        id
        userdetailObj {
          photo
          userObj {
            firstName
            lastName
            email
          }
        }
      }
    }
  }
`;

export const QUERY_CORPORATECOMPANYLIST = gql`
  query CorporateCompanyList($search: String, $limit: Int, $offset: Int) {
    corporateCompanyList(search: $search, limit: $limit, offset: $offset) {
      page
      pages
      totalRecord
      hasNext
      hasPrev
      objects {
        id
        name
        photo
        billingEmail
        subscription
        individualCreditsPerEmployee
        companylocationSet {
          id
          location
          corporatecompanyadminSet {
            admin {
              userdetailObj {
                userObj {
                  firstName
                  lastName
                }
              }
            }
          }
        }
        corporatecompanyadminSet {
          id
          admin {
            id
            userdetailObj {
              photo
              userObj {
                firstName
                lastName
                email
              }
            }
          }
          location {
            id
            location
          }
        }
      }
    }
  }
`;

export const QUERY_UPDATECORPORATECOMPANY = gql`
  mutation UpdateCorporateCompany(
    $id: ID!
    $input: CorporateCompanyUpdateInput!
  ) {
    updateCorporateCompany(id: $id, input: $input) {
      corporateCompany {
        id
        name
        billingEmail
        photo
      }
      ok
    }
  }
`;

export const QUERY_EMPLOYEEDATABYPAGE = gql`
  query EmployeeDataByPage {
    employeesDataPage {
      totalEmployees
      employeeList {
        employee {
          id
          userdetailObj {
            photo
            userObj {
              firstName
              lastName
              email
            }
          }
        }
        avgSessionPerMonth
        lastSession
      }
    }
  }
`;

export const GET_SUBSCRIPTION_CENTER_URL = gql`
  query GetSubscriptionCenterUrl {
    getSubscriptionCenterUrl {
      url
    }
  }
`;

export const SELF_SERVE_ADD_SEATS = gql`
  mutation SelfServeAddSeats($noOfSeatsToAdd: Int!) {
    selfServeAddSeats(noOfSeatsToAdd: $noOfSeatsToAdd) {
      ok
      company {
        noOfSeats
      }
      seatsAdded
    }
  }
`;

export const SELF_SERVE_REMOVE_SEATS = gql`
  mutation SelfServeRemoveSeats($noOfSeatsToRemove: Int!) {
    selfServeRemoveSeats(noOfSeatsToRemove: $noOfSeatsToRemove) {
      ok
      company {
        noOfSeats
      }
      seatsRemoved
    }
  }
`;

export const CREATE_CORPORATE_COMPANY_ADMIN = gql`
  mutation CreateCorporateCompanyAdmin(
    $input: CorporateCompanyAdminCreateInput!
  ) {
    createCorporateCompanyAdmin(input: $input) {
      ok
      corporateCompanyAdmin {
        id
        admin {
          userdetailObj {
            role {
              name
            }
            userObj {
              email
            }
          }
        }
      }
    }
  }
`;

export const ACTIVE_MEMBER_LIST = gql`
  query ActiveMemberList($companyID: ID!) {
    activeMemberList(companyID: $companyID) {
      id
      userdetailObj {
        userObj {
          isActive
          email
          firstName
          lastName
        }
      }
    }
  }
`;
export const QUERY_CORPORATE_COMPANY_LOCATION_LIST = gql`
  query CompanyLocationList(
    $companyID: ID!
    $search: String
    $limit: Int
    $offset: Int
  ) {
    companyLocationList(
      companyID: $companyID
      search: $search
      limit: $limit
      offset: $offset
    ) {
      objects {
        id
        company {
          id
        }
        location
      }
    }
  }
`;
