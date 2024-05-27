export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  GenericScalar: any;
  JSONString: any;
  Time: any;
  UUID: any;
  WONEGeneratorPattern: any;
};

export type AccessTokenInput = {
  classSessionID?: Maybe<Scalars["ID"]>;
  groupSessionInstanceID?: Maybe<Scalars["ID"]>;
};

export type AchievementsType = {
  __typename?: "AchievementsType";
  totalWellbeingHours?: Maybe<Scalars["Int"]>;
  averageWeeklyTime?: Maybe<Scalars["Int"]>;
  currentStreak?: Maybe<Scalars["Int"]>;
  longestStreak?: Maybe<Scalars["Int"]>;
};

export type AddressChoiceType = {
  __typename?: "AddressChoiceType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  name: Scalars["String"];
  addressSet: Array<AddressType>;
};

export type AddressInput = {
  addressChoiceID: Scalars["ID"];
  addressLine1?: Maybe<Scalars["String"]>;
  addressLine2?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  postCode?: Maybe<Scalars["String"]>;
};

export type AddressType = {
  __typename?: "AddressType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  addressChoice?: Maybe<AddressChoiceType>;
  addressLine1?: Maybe<Scalars["String"]>;
  addressLine2?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  country: Scalars["String"];
  postCode?: Maybe<Scalars["String"]>;
  userdetailSet: Array<UserDetailType>;
  corporatecompanySet: Array<CorporateCompanyType>;
  classsessionSet: Array<ClassSessionType>;
};

export type AgoraDetailType = {
  __typename?: "AgoraDetailType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  channelName: Scalars["String"];
  resourceId?: Maybe<Scalars["String"]>;
  sid?: Maybe<Scalars["String"]>;
  uid?: Maybe<Scalars["String"]>;
  groupsessioninstanceSet: Array<GroupSessionInstanceType>;
  classsessionSet: Array<ClassSessionType>;
};

export type AppFeedbackResponse = {
  __typename?: "AppFeedbackResponse";
  platform?: Maybe<Scalars["String"]>;
  text?: Maybe<Scalars["String"]>;
  isPermissionToContact?: Maybe<Scalars["Boolean"]>;
};

export type AppFeedbackType = {
  __typename?: "AppFeedbackType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  user: UserType;
  platform?: Maybe<Scalars["String"]>;
  text?: Maybe<Scalars["String"]>;
  isPermissionToContact?: Maybe<Scalars["Boolean"]>;
};

export type AppInfo = {
  platform: Platform;
  name: Scalars["String"];
  version: Scalars["String"];
  timeZone: Scalars["String"];
};

export type AppointmentsPaginatedType = {
  __typename?: "AppointmentsPaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<SessionUnionType>>>;
};

export type ArticleCreateInput = {
  author: Scalars["String"];
  title: Scalars["String"];
  content: Scalars["String"];
  categoryID: Scalars["ID"];
  planList?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  photo: Scalars["String"];
  subTitle: Scalars["String"];
  showOnCommunityPage?: Maybe<Scalars["Boolean"]>;
  pillar: Scalars["String"];
};

export type ArticlePaginatedType = {
  __typename?: "ArticlePaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<ArticleType>>>;
};

export type ArticleType = {
  __typename?: "ArticleType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  author?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  subTitle: Scalars["String"];
  category: CategoryType;
  content: Scalars["String"];
  plans: Array<PlanType>;
  photo: Scalars["String"];
  showOnCommunityPage: Scalars["Boolean"];
  pillar?: Maybe<PillarType>;
  userfavouritesSet: Array<UserFavouritesType>;
};

export type ArticleUpdateInput = {
  author?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
  categoryID?: Maybe<Scalars["ID"]>;
  planList?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  photo?: Maybe<Scalars["String"]>;
  subTitle?: Maybe<Scalars["String"]>;
  showOnCommunityPage?: Maybe<Scalars["Boolean"]>;
  pillar?: Maybe<Scalars["String"]>;
};

export type BillingOutputType = {
  __typename?: "BillingOutputType";
  subscribedEmployees?: Maybe<Scalars["Int"]>;
  pricePerSubscription?: Maybe<Scalars["Int"]>;
  individualCreditsPerEmployee?: Maybe<Scalars["Int"]>;
  additionalTotalCredits?: Maybe<Scalars["Int"]>;
};

export type BiometricsType = {
  __typename?: "BiometricsType";
  vitalUserId?: Maybe<Scalars["String"]>;
  connectedSources?: Maybe<Array<Maybe<VitalProviderType>>>;
  lastNightsSleep?: Maybe<Scalars["String"]>;
  lastMeasuredHeartrate?: Maybe<Scalars["String"]>;
  stepCount?: Maybe<Scalars["Int"]>;
};

export type BiometricsVitalUserConnectedSourcesType = {
  __typename?: "BiometricsVitalUserConnectedSourcesType";
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  id: Scalars["ID"];
  user: BiometricsVitalUserType;
  isActive: Scalars["Boolean"];
};

export type BiometricsVitalUserType = {
  __typename?: "BiometricsVitalUserType";
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  id: Scalars["ID"];
  vitalUserId: Scalars["UUID"];
  clientUserId: Scalars["String"];
  userdetail: UserDetailType;
  biometricsvitaluserconnectedsourceSet: Array<BiometricsVitalUserConnectedSourcesType>;
};

export type BooleanInput = {
  __typename?: "BooleanInput";
  id: Scalars["String"];
  label: Scalars["String"];
  required: Scalars["Boolean"];
  reverseLogic?: Maybe<Scalars["Boolean"]>;
  checked?: Maybe<Scalars["Boolean"]>;
};

export type BulkEventType = {
  __typename?: "BulkEventType";
  addedEvents?: Maybe<Scalars["Boolean"]>;
  addedEventsTo?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export enum ButtonStyle {
  Primary = "PRIMARY",
  Secondary = "SECONDARY",
  Disabled = "DISABLED",
}

export type CdTeacherCalendarList = {
  __typename?: "CDTeacherCalendarList";
  ok?: Maybe<Scalars["Boolean"]>;
  teachercalendarDetailList?: Maybe<Array<Maybe<TeacherCalendarType>>>;
};

export type CancelGroupSession = {
  __typename?: "CancelGroupSession";
  ok?: Maybe<Scalars["Boolean"]>;
  groupSession?: Maybe<GroupSessionType>;
};

export type CategoryCreateInput = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
};

export type CategoryPaginatedType = {
  __typename?: "CategoryPaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<CategoryType>>>;
};

export type CategoryType = {
  __typename?: "CategoryType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  name: Scalars["String"];
  description: Scalars["String"];
  articleSet: Array<ArticleType>;
};

export type CategoryUpdateInput = {
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
};

export type ChangePassword = {
  __typename?: "ChangePassword";
  sentMail?: Maybe<Scalars["Boolean"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<UserType>;
};

export type ChangePasswordInput = {
  oldPassword: Scalars["String"];
  newPassword: Scalars["String"];
};

export type ChangePasswordInputWithLink = {
  newPassword: Scalars["String"];
};

export type ChangePasswordWithLink = {
  __typename?: "ChangePasswordWithLink";
  sentMail?: Maybe<Scalars["Boolean"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<UserType>;
};

export type ClassCreateInput = {
  photo?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  description: Scalars["String"];
  serviceID: Scalars["ID"];
  plans?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  preparationMaterials: Scalars["String"];
  showOnApp?: Maybe<Scalars["Boolean"]>;
};

export type ClassModelType = {
  __typename?: "ClassModelType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  photo?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  description: Scalars["String"];
  service: ServiceType;
  plans: Array<PlanType>;
  preparationMaterials: Scalars["String"];
  showOnApp: Scalars["Boolean"];
  teacherdetailSet: Array<TeacherDetailType>;
  pricingsystemSet: Array<PricingSystemType>;
  promocodeSet: Array<PromoCodeType>;
  groupsessionSet: Array<GroupSessionType>;
  classsessionSet: Array<ClassSessionType>;
};

export type ClassPageType = {
  __typename?: "ClassPageType";
  classObj?: Maybe<ClassModelType>;
  minCredits?: Maybe<Scalars["Int"]>;
  maxCredits?: Maybe<Scalars["Int"]>;
  teacherList?: Maybe<Array<Maybe<TeacherDataType>>>;
  groupSessionInstanceList?: Maybe<Array<Maybe<GroupSessionInstanceType>>>;
};

export type ClassRatingType = {
  __typename?: "ClassRatingType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  name: Scalars["String"];
  sessionfeedbackSet: Array<SessionFeedbackType>;
  teacherfeedbackbystudentSet: Array<TeacherFeedbackByStudentType>;
};

export type ClassSessionCreateInput = {
  classID: Scalars["ID"];
  classTypeID: Scalars["ID"];
  teacherID: Scalars["ID"];
  studentID: Scalars["ID"];
  credit: Scalars["Int"];
  scheduledDate: Scalars["Date"];
  startTime: Scalars["Time"];
  endTime: Scalars["Time"];
  planID?: Maybe<Scalars["ID"]>;
  address?: Maybe<Scalars["JSONString"]>;
  inviteeEmailList?: Maybe<Array<Maybe<Scalars["String"]>>>;
  promoCodeID?: Maybe<Scalars["ID"]>;
  studentComments?: Maybe<Scalars["String"]>;
  userTimezone?: Maybe<Scalars["String"]>;
  sessionRegistrationPlatform?: Maybe<Scalars["String"]>;
};

export type ClassSessionPaginatedType = {
  __typename?: "ClassSessionPaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<ClassSessionType>>>;
};

export enum ClassSessionStatus {
  Scheduled = "SCHEDULED",
  Rescheduled = "RESCHEDULED",
  Cancelled = "CANCELLED",
}

export type ClassSessionType = {
  __typename?: "ClassSessionType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  classObj: ClassModelType;
  classType: ClassTypeType;
  teacher?: Maybe<TeacherDetailType>;
  student?: Maybe<StudentDetailType>;
  scheduledDate: Scalars["Date"];
  startTime?: Maybe<Scalars["String"]>;
  endTime?: Maybe<Scalars["String"]>;
  startDateTime?: Maybe<Scalars["DateTime"]>;
  endDateTime?: Maybe<Scalars["DateTime"]>;
  plan?: Maybe<PlanType>;
  address?: Maybe<AddressType>;
  credit: Scalars["Int"];
  status: ClassSessionStatus;
  agoraDetails?: Maybe<AgoraDetailType>;
  promoCode?: Maybe<PromoCodeType>;
  studentComments?: Maybe<Scalars["String"]>;
  studentReminderEmail?: Maybe<Scalars["DateTime"]>;
  teacherReminderEmail?: Maybe<Scalars["DateTime"]>;
  sessionRegistrationPlatform?: Maybe<Scalars["String"]>;
  hasJoined: Scalars["Boolean"];
  sessionJoiningPlatform?: Maybe<Scalars["String"]>;
  joiningLink?: Maybe<Scalars["String"]>;
  isTeacherPaidIfCancelled: Scalars["Boolean"];
  reasonForCancellation?: Maybe<Scalars["String"]>;
  cancelledAt?: Maybe<Scalars["DateTime"]>;
  cancelledBy?: Maybe<UserType>;
  invitationSet: Array<InvitationType>;
  studentfeedbackbyteacherSet: Array<StudentFeedbackByTeacherType>;
  PrivateSession?: Maybe<SessionFeedbackType>;
  sessionfeedbackSet: Array<SessionFeedbackType>;
  teachersessionnote?: Maybe<TeacherSessionNotesType>;
  teacherfeedbackbystudentSet: Array<TeacherFeedbackByStudentType>;
  moodSet: Array<MoodType>;
  sessioncalendarinviteSet: Array<SessionCalendarInviteType>;
  day?: Maybe<Scalars["String"]>;
  duration?: Maybe<Scalars["Int"]>;
  teacherPaymentPrice?: Maybe<Scalars["Float"]>;
};

export type ClassSessionUpdateInput = {
  classObj?: Maybe<Scalars["ID"]>;
  classType?: Maybe<Scalars["ID"]>;
  teacher?: Maybe<Scalars["ID"]>;
  scheduledDate?: Maybe<Scalars["Date"]>;
  startTime?: Maybe<Scalars["Time"]>;
  endTime?: Maybe<Scalars["Time"]>;
  planID?: Maybe<Scalars["ID"]>;
  address?: Maybe<Scalars["JSONString"]>;
  inviteeEmailList?: Maybe<Array<Maybe<Scalars["String"]>>>;
  joinedInviteeList?: Maybe<Array<Maybe<Scalars["String"]>>>;
  status?: Maybe<Scalars["String"]>;
  reasonForCancellation?: Maybe<Scalars["String"]>;
  sendConfirmationMail?: Maybe<Scalars["Boolean"]>;
  userTimezone?: Maybe<Scalars["String"]>;
  sessionRegistrationPlatform?: Maybe<Scalars["String"]>;
  sessionJoiningPlatform?: Maybe<Scalars["String"]>;
  joiningLink?: Maybe<Scalars["String"]>;
};

export type ClassTypeInput = {
  name: Scalars["String"];
};

export type ClassTypeType = {
  __typename?: "ClassTypeType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  name: Scalars["String"];
  teachercalendarSet: Array<TeacherCalendarType>;
  pricingsystemSet: Array<PricingSystemType>;
  groupsessionSet: Array<GroupSessionType>;
  classsessionSet: Array<ClassSessionType>;
};

export type ClassUpdateInput = {
  photo?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  serviceID?: Maybe<Scalars["ID"]>;
  plans?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  preparationMaterials?: Maybe<Scalars["String"]>;
  showOnApp?: Maybe<Scalars["Boolean"]>;
};

export type CommunityPageType = {
  __typename?: "CommunityPageType";
  companySessionToday?: Maybe<Array<Maybe<GroupSessionInstanceType>>>;
  companySessionThisWeek?: Maybe<Array<Maybe<GroupSessionInstanceType>>>;
  communitySessionToday?: Maybe<Array<Maybe<GroupSessionInstanceType>>>;
  communitySessionThisWeek?: Maybe<Array<Maybe<GroupSessionInstanceType>>>;
  recordedSession?: Maybe<Array<Maybe<GroupSessionInstanceType>>>;
  articleList?: Maybe<Array<Maybe<ArticleType>>>;
  filters?: Maybe<FiltersType>;
};

export type CompanyLocationCreateInput = {
  companyID: Scalars["ID"];
  location: Scalars["String"];
};

export type CompanyLocationInput = {
  id?: Maybe<Scalars["ID"]>;
  company?: Maybe<Scalars["ID"]>;
  location: Scalars["String"];
};

export type CompanyLocationPaginatedType = {
  __typename?: "CompanyLocationPaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<CompanyLocationType>>>;
};

export type CompanyLocationType = {
  __typename?: "CompanyLocationType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  company: CorporateCompanyType;
  location: Scalars["String"];
  studentdetailSet: Array<StudentDetailType>;
  corporatecompanyadminSet: Array<CorporateCompanyAdminType>;
};

export type CompanyLocationUpdateInput = {
  companyID?: Maybe<Scalars["ID"]>;
  location?: Maybe<Scalars["String"]>;
};

export type CorporateCompanyAdminCreateInput = {
  companyID: Scalars["ID"];
  studentID: Scalars["ID"];
  locationID?: Maybe<Scalars["ID"]>;
};

export type CorporateCompanyAdminPaginatedType = {
  __typename?: "CorporateCompanyAdminPaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<CorporateCompanyAdminType>>>;
};

export type CorporateCompanyAdminType = {
  __typename?: "CorporateCompanyAdminType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  company: CorporateCompanyType;
  admin?: Maybe<StudentDetailType>;
  location?: Maybe<CompanyLocationType>;
};

export type CorporateCompanyAdminUpdateInput = {
  companyID?: Maybe<Scalars["ID"]>;
  adminID?: Maybe<Scalars["ID"]>;
  locationID?: Maybe<Scalars["ID"]>;
};

export type CorporateCompanyCreateInput = {
  photo?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  billingEmail: Scalars["String"];
  subscription: Scalars["Int"];
  individualCreditsPerEmployee: Scalars["Int"];
  locationList: Array<Maybe<Scalars["String"]>>;
  externalAssessmentUrl?: Maybe<Scalars["String"]>;
  shouldCreateSignUpLink?: Maybe<Scalars["Boolean"]>;
};

export type CorporateCompanyPaginatedType = {
  __typename?: "CorporateCompanyPaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<CorporateCompanyType>>>;
};

export type CorporateCompanyType = {
  __typename?: "CorporateCompanyType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  photo?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  billingEmail: Scalars["String"];
  subscription: Scalars["Int"];
  individualCreditsPerEmployee: Scalars["Int"];
  feedbackLink?: Maybe<Scalars["String"]>;
  externalAssessmentUrl?: Maybe<Scalars["String"]>;
  address?: Maybe<AddressType>;
  domain?: Maybe<Scalars["String"]>;
  noOfSeats?: Maybe<Scalars["Int"]>;
  stripeCustomerId?: Maybe<Scalars["String"]>;
  currentStripeSubscriptionId?: Maybe<Scalars["String"]>;
  subscriptionStatus?: Maybe<Scalars["String"]>;
  subscriptionCanceledAt?: Maybe<Scalars["DateTime"]>;
  subscriptionEndedAt?: Maybe<Scalars["DateTime"]>;
  checkoutPaymentStatus?: Maybe<Scalars["String"]>;
  enableSingleSignOnWithAzureAd: Scalars["Boolean"];
  companylocationSet: Array<CompanyLocationType>;
  studentdetailSet: Array<StudentDetailType>;
  corporatecompanyadminSet: Array<CorporateCompanyAdminType>;
  groupsessionSet: Array<GroupSessionType>;
  paymentLink?: Maybe<Scalars["String"]>;
  seatsLeft?: Maybe<Scalars["Int"]>;
  seatsUsed?: Maybe<Scalars["Int"]>;
  nextPayment?: Maybe<Scalars["GenericScalar"]>;
  signUpLink?: Maybe<Scalars["String"]>;
  signUpLinkExpiresOn?: Maybe<Scalars["String"]>;
};

export type CorporateCompanyUpdateInput = {
  photo?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  billingEmail?: Maybe<Scalars["String"]>;
  subscription?: Maybe<Scalars["Int"]>;
  individualCreditsPerEmployee?: Maybe<Scalars["Int"]>;
  locationList?: Maybe<Array<Maybe<CompanyLocationInput>>>;
  externalAssessmentUrl?: Maybe<Scalars["String"]>;
};

export type CorporateDashboardType = {
  __typename?: "CorporateDashboardType";
  viewYourEngagement?: Maybe<ViewYourEngagement>;
  employeesWellbeingPlans?: Maybe<EmployeesWellbeingPlans>;
  sessionPerMonth?: Maybe<SessionsPerMonth>;
};

export type CountryEmployeeCountType = {
  __typename?: "CountryEmployeeCountType";
  country?: Maybe<Scalars["String"]>;
  activeEmployeeCount?: Maybe<Scalars["Int"]>;
};

export type CreateAccessToken = {
  __typename?: "CreateAccessToken";
  ok?: Maybe<Scalars["Boolean"]>;
  agoraDetail?: Maybe<AgoraDetailType>;
  rtcTokenWithUid?: Maybe<Scalars["String"]>;
};

export type CreateAddress = {
  __typename?: "CreateAddress";
  ok?: Maybe<Scalars["Boolean"]>;
  address?: Maybe<AddressType>;
};

export type CreateAppFeedback = {
  __typename?: "CreateAppFeedback";
  ok?: Maybe<Scalars["Boolean"]>;
  appfeedback?: Maybe<AppFeedbackResponse>;
};

export type CreateAppFeedbackInput = {
  platform: Scalars["String"];
  text: Scalars["String"];
  isPermissionToContact: Scalars["Boolean"];
};

export type CreateArticle = {
  __typename?: "CreateArticle";
  ok?: Maybe<Scalars["Boolean"]>;
  article?: Maybe<ArticleType>;
};

export type CreateCategory = {
  __typename?: "CreateCategory";
  ok?: Maybe<Scalars["Boolean"]>;
  category?: Maybe<CategoryType>;
};

export type CreateClass = {
  __typename?: "CreateClass";
  ok?: Maybe<Scalars["Boolean"]>;
  classModel?: Maybe<ClassModelType>;
};

export type CreateClassSession = {
  __typename?: "CreateClassSession";
  ok?: Maybe<Scalars["Boolean"]>;
  sentMailStudent?: Maybe<Scalars["Boolean"]>;
  sentMailTeacher?: Maybe<Scalars["Boolean"]>;
  classSession?: Maybe<ClassSessionType>;
};

export type CreateClassType = {
  __typename?: "CreateClassType";
  ok?: Maybe<Scalars["Boolean"]>;
  classtype?: Maybe<ClassTypeType>;
};

export type CreateCompanyLocation = {
  __typename?: "CreateCompanyLocation";
  ok?: Maybe<Scalars["Boolean"]>;
  companyLocation?: Maybe<CompanyLocationType>;
};

export type CreateCompanySignUpLink = {
  __typename?: "CreateCompanySignUpLink";
  ok?: Maybe<Scalars["Boolean"]>;
  signUpLink?: Maybe<Scalars["String"]>;
  signUpLinkExpiresOn?: Maybe<Scalars["String"]>;
};

export type CreateCorporateCompany = {
  __typename?: "CreateCorporateCompany";
  ok?: Maybe<Scalars["Boolean"]>;
  corporateCompany?: Maybe<CorporateCompanyType>;
};

export type CreateCorporateCompanyAdmin = {
  __typename?: "CreateCorporateCompanyAdmin";
  ok?: Maybe<Scalars["Boolean"]>;
  corporateCompanyAdmin?: Maybe<CorporateCompanyAdminType>;
};

export type CreateDuration = {
  __typename?: "CreateDuration";
  ok?: Maybe<Scalars["Boolean"]>;
  duration?: Maybe<DurationType>;
};

export type CreateEmailTemplate = {
  __typename?: "CreateEmailTemplate";
  ok?: Maybe<Scalars["Boolean"]>;
  emailTemplate?: Maybe<EmailTemplateType>;
};

export type CreateEmployee = {
  __typename?: "CreateEmployee";
  ok?: Maybe<Scalars["Boolean"]>;
  sentMail?: Maybe<Scalars["Boolean"]>;
  employee?: Maybe<StudentDetailType>;
};

export type CreateEmployeeInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  roles: Array<Maybe<Scalars["ID"]>>;
  photo?: Maybe<Scalars["String"]>;
  plans?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  wellbeingHours?: Maybe<Scalars["Int"]>;
  companyID: Scalars["ID"];
  timezone?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  companyLocationID?: Maybe<Scalars["ID"]>;
  sendCalenderInvites?: Maybe<Scalars["Boolean"]>;
  permissionToSendCalendarInvites?: Maybe<Scalars["Boolean"]>;
  pillarName?: Maybe<Scalars["String"]>;
};

export type CreateEphemeralKey = {
  __typename?: "CreateEphemeralKey";
  ok?: Maybe<Scalars["Boolean"]>;
  ephemeralKey?: Maybe<Scalars["String"]>;
};

export type CreateGroupSession = {
  __typename?: "CreateGroupSession";
  ok?: Maybe<Scalars["Boolean"]>;
  groupSession?: Maybe<GroupSessionType>;
};

export type CreateGroupSessionFeedbackByTeacher = {
  __typename?: "CreateGroupSessionFeedbackByTeacher";
  ok?: Maybe<Scalars["Boolean"]>;
  groupSessionFeedbackList?: Maybe<Array<Maybe<StudentFeedbackByTeacherType>>>;
};

export type CreateLocation = {
  __typename?: "CreateLocation";
  ok?: Maybe<Scalars["Boolean"]>;
  location?: Maybe<LocationType>;
};

export type CreateMood = {
  __typename?: "CreateMood";
  ok?: Maybe<Scalars["Boolean"]>;
  mood?: Maybe<MoodType>;
};

export type CreateMoodInput = {
  before: Scalars["Int"];
  sessionID: Scalars["ID"];
};

export type CreateOnboarding = {
  __typename?: "CreateOnboarding";
  ok?: Maybe<Scalars["Boolean"]>;
  sentMail?: Maybe<Scalars["Boolean"]>;
  onboarding?: Maybe<OnboardingType>;
  studentDetail?: Maybe<StudentDetailType>;
};

export type CreatePackage = {
  __typename?: "CreatePackage";
  ok?: Maybe<Scalars["Boolean"]>;
  package?: Maybe<PackageType>;
};

export type CreatePayment = {
  __typename?: "CreatePayment";
  ok?: Maybe<Scalars["Boolean"]>;
  sentMail?: Maybe<Scalars["Boolean"]>;
  payment?: Maybe<PaymentType>;
};

export type CreatePaymentIntent = {
  __typename?: "CreatePaymentIntent";
  ok?: Maybe<Scalars["Boolean"]>;
  paymentIntent?: Maybe<Scalars["JSONString"]>;
};

export type CreatePlan = {
  __typename?: "CreatePlan";
  ok?: Maybe<Scalars["Boolean"]>;
  plan?: Maybe<PlanType>;
};

export type CreatePricingSystem = {
  __typename?: "CreatePricingSystem";
  ok?: Maybe<Scalars["Boolean"]>;
  pricingSystem?: Maybe<PricingSystemType>;
};

export type CreatePromoCode = {
  __typename?: "CreatePromoCode";
  ok?: Maybe<Scalars["Boolean"]>;
  promoCode?: Maybe<PromoCodeType>;
};

export type CreateQuestion = {
  __typename?: "CreateQuestion";
  ok?: Maybe<Scalars["Boolean"]>;
  question?: Maybe<QuestionType>;
};

export type CreateRole = {
  __typename?: "CreateRole";
  ok?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<RoleType>;
};

export type CreateService = {
  __typename?: "CreateService";
  ok?: Maybe<Scalars["Boolean"]>;
  service?: Maybe<ServiceType>;
};

export type CreateSessionFeedback = {
  __typename?: "CreateSessionFeedback";
  ok?: Maybe<Scalars["Boolean"]>;
  sessionFeedback?: Maybe<SessionFeedbackType>;
};

export type CreateSessionFeedbackInput = {
  sessionID: Scalars["ID"];
  moodBefore: Scalars["Int"];
  moodAfter: Scalars["Int"];
  classRatingID: Scalars["ID"];
  teacherCharacteristicsIDList: Array<Maybe<Scalars["ID"]>>;
  notes?: Maybe<Scalars["String"]>;
};

export type CreateStudentDetail = {
  __typename?: "CreateStudentDetail";
  ok?: Maybe<Scalars["Boolean"]>;
  sentMail?: Maybe<Scalars["Boolean"]>;
  studentDetail?: Maybe<StudentDetailType>;
  Token?: Maybe<Scalars["String"]>;
};

export type CreateStudentFeedbackByTeacher = {
  __typename?: "CreateStudentFeedbackByTeacher";
  ok?: Maybe<Scalars["Boolean"]>;
  studentfeedbackbyteacher?: Maybe<StudentFeedbackByTeacherType>;
};

export type CreateStudentFeedbackByTeacherInput = {
  teacherID: Scalars["ID"];
  sessionID: Scalars["ID"];
  studentID: Scalars["ID"];
  title: Scalars["String"];
  notes: Scalars["String"];
};

export type CreateTeacherBankDetail = {
  __typename?: "CreateTeacherBankDetail";
  ok?: Maybe<Scalars["Boolean"]>;
  teacherbankDetail?: Maybe<TeacherBankDetailType>;
};

export type CreateTeacherCalendar = {
  __typename?: "CreateTeacherCalendar";
  ok?: Maybe<Scalars["Boolean"]>;
  teachercalendarDetail?: Maybe<TeacherCalendarType>;
};

export type CreateTeacherCalendarDayOff = {
  __typename?: "CreateTeacherCalendarDayOff";
  ok?: Maybe<Scalars["Boolean"]>;
  teachercalendardayoff?: Maybe<TeacherCalendarDaysOffType>;
};

export type CreateTeacherDetail = {
  __typename?: "CreateTeacherDetail";
  ok?: Maybe<Scalars["Boolean"]>;
  mailSent?: Maybe<Scalars["Boolean"]>;
  teacherDetail?: Maybe<TeacherDetailType>;
};

export type CreateTeacherFeedbackByStudent = {
  __typename?: "CreateTeacherFeedbackByStudent";
  ok?: Maybe<Scalars["Boolean"]>;
  teacherfeedbackbystudent?: Maybe<TeacherFeedbackByStudentType>;
};

export type CreateTeacherFeedbackByStudentInput = {
  studentID: Scalars["ID"];
  sessionID: Scalars["ID"];
  teacherID: Scalars["ID"];
  classRatingID: Scalars["ID"];
  characteristicIDList: Array<Maybe<Scalars["ID"]>>;
  notes?: Maybe<Scalars["String"]>;
};

export type CreateTeacherLevel = {
  __typename?: "CreateTeacherLevel";
  ok?: Maybe<Scalars["Boolean"]>;
  teacherLevel?: Maybe<TeacherLevelType>;
};

export type CreateUpdateCreditValue = {
  __typename?: "CreateUpdateCreditValue";
  ok?: Maybe<Scalars["Boolean"]>;
  creditValue?: Maybe<CreditValueType>;
};

export type CreateUpdateFcmDevice = {
  __typename?: "CreateUpdateFCMDevice";
  ok?: Maybe<Scalars["Boolean"]>;
  fcmDevice?: Maybe<FcmDeviceTypeModel>;
};

export type CreateUpdateGroupSessionFeedbackByTeacher = {
  __typename?: "CreateUpdateGroupSessionFeedbackByTeacher";
  ok?: Maybe<Scalars["Boolean"]>;
  groupSessionFeedbackList?: Maybe<Array<Maybe<StudentFeedbackByTeacherType>>>;
};

export type CreateUpdateSessionFeedback = {
  __typename?: "CreateUpdateSessionFeedback";
  ok?: Maybe<Scalars["Boolean"]>;
  eventCreated?: Maybe<Scalars["Boolean"]>;
  sessionFeedback?: Maybe<SessionFeedbackType>;
};

export type CreateUpdateSessionFeedbackInput = {
  sessionType: Scalars["String"];
  sessionID: Scalars["ID"];
  moodBefore?: Maybe<Scalars["Int"]>;
  moodAfter?: Maybe<Scalars["Int"]>;
  classRatingID?: Maybe<Scalars["ID"]>;
  teacherCharacteristicsIDList?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  notes?: Maybe<Scalars["String"]>;
  platform?: Maybe<Scalars["String"]>;
};

export type CreateUpdateTeacherSessionNotes = {
  __typename?: "CreateUpdateTeacherSessionNotes";
  ok?: Maybe<Scalars["Boolean"]>;
  sessionNotes?: Maybe<TeacherSessionNotesType>;
};

export type CreateUpdateTeacherSessionNotesInput = {
  sessionType: Scalars["String"];
  sessionID: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
  notes?: Maybe<Scalars["String"]>;
};

export type CreateUpdateUserFavourites = {
  __typename?: "CreateUpdateUserFavourites";
  ok?: Maybe<Scalars["Boolean"]>;
  userFavorites?: Maybe<UserFavouritesType>;
};

export type CreateUpdateUserNotificationPermissions = {
  __typename?: "CreateUpdateUserNotificationPermissions";
  ok?: Maybe<Scalars["Boolean"]>;
  userNotificationsPermissions?: Maybe<UserNotificationPermissionResponse>;
};

export type CreateUser = {
  __typename?: "CreateUser";
  ok?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<UserType>;
  userDetail?: Maybe<UserDetailType>;
};

export type CreateUserDetail = {
  __typename?: "CreateUserDetail";
  ok?: Maybe<Scalars["Boolean"]>;
  userDetail?: Maybe<UserDetailType>;
};

export type CreateUserSurvey = {
  __typename?: "CreateUserSurvey";
  ok?: Maybe<Scalars["Boolean"]>;
};

export type CreditValueInput = {
  value: Scalars["Int"];
};

export type CreditValueType = {
  __typename?: "CreditValueType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  value: Scalars["Int"];
};

export type DateInput = {
  __typename?: "DateInput";
  id: Scalars["String"];
  label: Scalars["String"];
  required: Scalars["Boolean"];
  minDate?: Maybe<Scalars["String"]>;
  maxDate?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export type DateTimeType = {
  __typename?: "DateTimeType";
  convertedStartDateTime?: Maybe<Scalars["DateTime"]>;
  convertedEndDateTime?: Maybe<Scalars["DateTime"]>;
};

export type DeactivateEmployee = {
  __typename?: "DeactivateEmployee";
  ok?: Maybe<Scalars["Boolean"]>;
  employee?: Maybe<StudentDetailType>;
};

export type DeactivateTeacher = {
  __typename?: "DeactivateTeacher";
  ok?: Maybe<Scalars["Boolean"]>;
  teacherDetail?: Maybe<TeacherDetailType>;
};

export type DeleteAddress = {
  __typename?: "DeleteAddress";
  ok?: Maybe<Scalars["Boolean"]>;
  address?: Maybe<AddressType>;
};

export type DeleteArticle = {
  __typename?: "DeleteArticle";
  ok?: Maybe<Scalars["Boolean"]>;
  article?: Maybe<ArticleType>;
};

export type DeleteCategory = {
  __typename?: "DeleteCategory";
  ok?: Maybe<Scalars["Boolean"]>;
  category?: Maybe<CategoryType>;
};

export type DeleteClass = {
  __typename?: "DeleteClass";
  ok?: Maybe<Scalars["Boolean"]>;
  classModel?: Maybe<ClassModelType>;
};

export type DeleteClassType = {
  __typename?: "DeleteClassType";
  ok?: Maybe<Scalars["Boolean"]>;
  classtype?: Maybe<ClassTypeType>;
};

export type DeleteCompanyLocation = {
  __typename?: "DeleteCompanyLocation";
  ok?: Maybe<Scalars["Boolean"]>;
  companyLocation?: Maybe<CompanyLocationType>;
};

export type DeleteCompanySignUpLink = {
  __typename?: "DeleteCompanySignUpLink";
  ok?: Maybe<Scalars["Boolean"]>;
  signUpLink?: Maybe<Scalars["String"]>;
  signUpLinkExpiresOn?: Maybe<Scalars["String"]>;
};

export type DeleteCorporateCompany = {
  __typename?: "DeleteCorporateCompany";
  ok?: Maybe<Scalars["Boolean"]>;
  corporateCompany?: Maybe<CorporateCompanyType>;
};

export type DeleteCorporateCompanyAdmin = {
  __typename?: "DeleteCorporateCompanyAdmin";
  ok?: Maybe<Scalars["Boolean"]>;
  deletedAdmin?: Maybe<StudentDetailType>;
};

export type DeleteDuplicateCalendarInvites = {
  __typename?: "DeleteDuplicateCalendarInvites";
  ok?: Maybe<Scalars["Boolean"]>;
};

export type DeleteDuration = {
  __typename?: "DeleteDuration";
  ok?: Maybe<Scalars["Boolean"]>;
  duration?: Maybe<DurationType>;
};

export type DeleteGroupSession = {
  __typename?: "DeleteGroupSession";
  ok?: Maybe<Scalars["Boolean"]>;
  groupSession?: Maybe<GroupSessionType>;
};

export type DeleteLocation = {
  __typename?: "DeleteLocation";
  ok?: Maybe<Scalars["Boolean"]>;
  location?: Maybe<LocationType>;
};

export type DeleteOnboarding = {
  __typename?: "DeleteOnboarding";
  ok?: Maybe<Scalars["Boolean"]>;
  onboarding?: Maybe<OnboardingType>;
};

export type DeletePackage = {
  __typename?: "DeletePackage";
  ok?: Maybe<Scalars["Boolean"]>;
  package?: Maybe<PackageType>;
};

export type DeletePlan = {
  __typename?: "DeletePlan";
  ok?: Maybe<Scalars["Boolean"]>;
  plan?: Maybe<PlanType>;
};

export type DeletePricingSystem = {
  __typename?: "DeletePricingSystem";
  ok?: Maybe<Scalars["Boolean"]>;
  pricingSystem?: Maybe<PricingSystemType>;
};

export type DeletePromoCode = {
  __typename?: "DeletePromoCode";
  ok?: Maybe<Scalars["Boolean"]>;
  promoCode?: Maybe<PromoCodeType>;
};

export type DeleteQuestion = {
  __typename?: "DeleteQuestion";
  ok?: Maybe<Scalars["Boolean"]>;
  question?: Maybe<QuestionType>;
};

export type DeleteRole = {
  __typename?: "DeleteRole";
  ok?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<RoleType>;
};

export type DeleteSentCalendarInvites = {
  __typename?: "DeleteSentCalendarInvites";
  ok?: Maybe<Scalars["Boolean"]>;
  deletedSessionCalendarInviteList?: Maybe<
    Array<Maybe<SessionCalendarInviteType>>
  >;
};

export type DeleteService = {
  __typename?: "DeleteService";
  ok?: Maybe<Scalars["Boolean"]>;
  service?: Maybe<ServiceType>;
};

export type DeleteStudentDetail = {
  __typename?: "DeleteStudentDetail";
  ok?: Maybe<Scalars["Boolean"]>;
  studentDetail?: Maybe<StudentDetailType>;
};

export type DeleteTeacherBankDetail = {
  __typename?: "DeleteTeacherBankDetail";
  ok?: Maybe<Scalars["Boolean"]>;
  teacherbankDetail?: Maybe<TeacherBankDetailType>;
};

export type DeleteTeacherCalendar = {
  __typename?: "DeleteTeacherCalendar";
  ok?: Maybe<Scalars["Boolean"]>;
  teacherCalendar?: Maybe<TeacherCalendarType>;
};

export type DeleteTeacherCalendarDayOff = {
  __typename?: "DeleteTeacherCalendarDayOff";
  ok?: Maybe<Scalars["Boolean"]>;
  teacherCalendarDayOff?: Maybe<TeacherCalendarDaysOffType>;
};

export type DeleteTeacherLevel = {
  __typename?: "DeleteTeacherLevel";
  ok?: Maybe<Scalars["Boolean"]>;
  teacherLevel?: Maybe<TeacherLevelType>;
};

export type DeleteUser = {
  __typename?: "DeleteUser";
  ok?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<UserType>;
};

export type DjangoDebug = {
  __typename?: "DjangoDebug";
  sql?: Maybe<Array<Maybe<DjangoDebugSql>>>;
};

export type DjangoDebugSql = {
  __typename?: "DjangoDebugSQL";
  vendor: Scalars["String"];
  alias: Scalars["String"];
  sql?: Maybe<Scalars["String"]>;
  duration: Scalars["Float"];
  rawSql: Scalars["String"];
  params: Scalars["String"];
  startTime: Scalars["Float"];
  stopTime: Scalars["Float"];
  isSlow: Scalars["Boolean"];
  isSelect: Scalars["Boolean"];
  transId?: Maybe<Scalars["String"]>;
  transStatus?: Maybe<Scalars["String"]>;
  isoLevel?: Maybe<Scalars["String"]>;
  encoding?: Maybe<Scalars["String"]>;
};

export type DurationInput = {
  duration: Scalars["Int"];
};

export type DurationType = {
  __typename?: "DurationType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  duration: Scalars["Int"];
  pricingsystemSet: Array<PricingSystemType>;
};

export type EmailTemplateCreateInput = {
  name: Scalars["String"];
  isActive: Scalars["Boolean"];
  subjectLine: Scalars["String"];
  preHeader: Scalars["String"];
  body: Scalars["String"];
};

export type EmailTemplateImagePaginatedType = {
  __typename?: "EmailTemplateImagePaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<EmailTemplateImageType>>>;
};

export type EmailTemplateImageType = {
  __typename?: "EmailTemplateImageType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  name: Scalars["String"];
  imageUrl?: Maybe<Scalars["String"]>;
};

export type EmailTemplatePaginatedType = {
  __typename?: "EmailTemplatePaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<EmailTemplateType>>>;
};

export type EmailTemplateType = {
  __typename?: "EmailTemplateType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  name: Scalars["String"];
  updatedBy?: Maybe<UserType>;
  isActive: Scalars["Boolean"];
  subjectLine: Scalars["String"];
  preHeader?: Maybe<Scalars["String"]>;
  body?: Maybe<Scalars["String"]>;
};

export type EmailTemplateUpdateInput = {
  name?: Maybe<Scalars["String"]>;
  isActive?: Maybe<Scalars["Boolean"]>;
  subjectLine?: Maybe<Scalars["String"]>;
  preHeader?: Maybe<Scalars["String"]>;
  body?: Maybe<Scalars["String"]>;
};

export type EmailTriggerType = {
  __typename?: "EmailTriggerType";
  failedEmailingList?: Maybe<Array<Maybe<FailedEmailListType>>>;
  triggeredList?: Maybe<Array<Maybe<SentMailType1>>>;
};

export type EmployeeDataType = {
  __typename?: "EmployeeDataType";
  employee?: Maybe<StudentDetailType>;
  avgSessionPerMonth?: Maybe<Scalars["Int"]>;
  status?: Maybe<Scalars["String"]>;
  creditsPerMonth?: Maybe<Scalars["Int"]>;
  lastSession?: Maybe<Scalars["Date"]>;
};

export type EmployeeGraphRecord = {
  __typename?: "EmployeeGraphRecord";
  label?: Maybe<Scalars["String"]>;
  data?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  borderColor?: Maybe<Scalars["String"]>;
  fill?: Maybe<Scalars["Boolean"]>;
};

export type EmployeesData = {
  __typename?: "EmployeesData";
  totalEmployees?: Maybe<Scalars["Int"]>;
  seatsLeft?: Maybe<Scalars["Int"]>;
  employeeList?: Maybe<Array<Maybe<EmployeeDataType>>>;
};

export type EmployeesWellbeingPlans = {
  __typename?: "EmployeesWellbeingPlans";
  totalEmployees?: Maybe<Scalars["Int"]>;
  labels?: Maybe<Array<Maybe<Scalars["String"]>>>;
  data?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  backgroundColor?: Maybe<Array<Maybe<Scalars["String"]>>>;
  hoverBackgroundColor?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type EphemeralKeyInput = {
  studentDetailID: Scalars["ID"];
  apiVersion: Scalars["String"];
};

export type ExternalAssessmentButton = {
  __typename?: "ExternalAssessmentButton";
  text: Scalars["String"];
  url: Scalars["String"];
};

export type ExternalAssessmentType = {
  __typename?: "ExternalAssessmentType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  student: StudentDetailType;
  assessmentPercentage: Scalars["Int"];
  energyScore: Scalars["Int"];
  resilienceScore: Scalars["Int"];
  nutritionScore: Scalars["Int"];
  energyIntention: Scalars["Int"];
  resilienceIntention: Scalars["Int"];
  nutritionIntention: Scalars["Int"];
  energyScorePercentage: Scalars["Int"];
  resilienceScorePercentage: Scalars["Int"];
  nutritionScorePercentage: Scalars["Int"];
  responseJson: Scalars["String"];
  energyDescription?: Maybe<Scalars["String"]>;
  resilienceDescription?: Maybe<Scalars["String"]>;
  nutritionDescription?: Maybe<Scalars["String"]>;
};

export type FcmDeviceInput = {
  name: Scalars["String"];
  registrationID: Scalars["String"];
  deviceID: Scalars["String"];
  active: Scalars["Boolean"];
  type: Scalars["String"];
};

export enum FcmDeviceType {
  Ios = "IOS",
  Android = "ANDROID",
  Web = "WEB",
}

export type FcmDeviceTypeModel = {
  __typename?: "FCMDeviceTypeModel";
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  active: Scalars["Boolean"];
  user?: Maybe<UserType>;
  dateCreated?: Maybe<Scalars["DateTime"]>;
  deviceId?: Maybe<Scalars["String"]>;
  registrationId: Scalars["String"];
  type: FcmDeviceType;
};

export type FailedEmailListType = {
  __typename?: "FailedEmailListType";
  email?: Maybe<Scalars["String"]>;
  tempPassword?: Maybe<Scalars["String"]>;
};

export type FeedbackCharacteristicType = {
  __typename?: "FeedbackCharacteristicType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  name: Scalars["String"];
  sessionfeedbackSet: Array<SessionFeedbackType>;
  teacherfeedbackbystudentSet: Array<TeacherFeedbackByStudentType>;
};

export type FeedbackMessage = {
  __typename?: "FeedbackMessage";
  title: Scalars["String"];
  senderAvatarUrl: Scalars["String"];
  senderName: Scalars["String"];
  textHtml: Scalars["String"];
  input?: Maybe<Input>;
  buttonText: Scalars["String"];
  skipButtonText?: Maybe<Scalars["String"]>;
};

export type GroupSessionAvailableTeacherType = {
  __typename?: "GroupSessionAvailableTeacherType";
  groupSessionInstanceObj?: Maybe<GroupSessionInstanceType>;
  availableTeacherList?: Maybe<Array<Maybe<TeacherAvailabilityListType>>>;
};

export type GroupSessionCreateInput = {
  groupSessionFor: Scalars["String"];
  photo?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  serviceID: Scalars["ID"];
  classID: Scalars["ID"];
  description?: Maybe<Scalars["String"]>;
  startDate: Scalars["Date"];
  repeatWeekly: Scalars["Boolean"];
  stopDate?: Maybe<Scalars["Date"]>;
  startTime: Scalars["Time"];
  endTime: Scalars["Time"];
  displayEndTime?: Maybe<Scalars["Time"]>;
  classTypeID: Scalars["ID"];
  preparationMaterial?: Maybe<Scalars["String"]>;
  corporateCompany?: Maybe<Scalars["ID"]>;
  pillar: Scalars["String"];
  calendarInviteTitle?: Maybe<Scalars["String"]>;
  calendarInviteDescription?: Maybe<Scalars["String"]>;
};

export type GroupSessionFeedbackByTeacherInput = {
  groupSessionInstanceID: Scalars["ID"];
  title?: Maybe<Scalars["String"]>;
  notes?: Maybe<Scalars["String"]>;
};

export enum GroupSessionGroupSessionFor {
  Community = "COMMUNITY",
  Corporate = "CORPORATE",
}

export type GroupSessionInstanceInput = {
  id?: Maybe<Scalars["ID"]>;
  scheduledDate?: Maybe<Scalars["Date"]>;
  teacherID?: Maybe<Scalars["ID"]>;
  recordingUrl?: Maybe<Scalars["String"]>;
  recordingUrlThumbnail?: Maybe<Scalars["String"]>;
  recordingDuration?: Maybe<Scalars["Float"]>;
  showOnClassPage?: Maybe<Scalars["Boolean"]>;
  showOnTeacherPage?: Maybe<Scalars["Boolean"]>;
  showOnCommunityPage?: Maybe<Scalars["Boolean"]>;
  joiningLink?: Maybe<Scalars["String"]>;
};

export type GroupSessionInstancePaginatedType = {
  __typename?: "GroupSessionInstancePaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<GroupSessionInstanceType>>>;
};

export type GroupSessionInstanceType = {
  __typename?: "GroupSessionInstanceType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  groupSession: GroupSessionType;
  scheduledDate: Scalars["Date"];
  instanceStartDateTime?: Maybe<Scalars["DateTime"]>;
  instanceEndDateTime?: Maybe<Scalars["DateTime"]>;
  instanceDisplayEndDateTime?: Maybe<Scalars["DateTime"]>;
  sessionDurationMinutes: Scalars["Int"];
  teacher?: Maybe<TeacherDetailType>;
  recordingUrlThumbnail?: Maybe<Scalars["String"]>;
  recordingUrl?: Maybe<Scalars["String"]>;
  recordingDuration?: Maybe<Scalars["Float"]>;
  agoraDetails?: Maybe<AgoraDetailType>;
  showOnClassPage: Scalars["Boolean"];
  showOnTeacherPage: Scalars["Boolean"];
  showOnCommunityPage: Scalars["Boolean"];
  joiningLink?: Maybe<Scalars["String"]>;
  teacherReminderEmail?: Maybe<Scalars["DateTime"]>;
  teacherdetail?: Maybe<TeacherDetailType>;
  groupsessionpeoplejoiningSet: Array<GroupSessionPeopleJoiningType>;
  studentfeedbackbyteacherSet: Array<StudentFeedbackByTeacherType>;
  sessionfeedbackSet: Array<SessionFeedbackType>;
  teachersessionnote?: Maybe<TeacherSessionNotesType>;
  userfavouritesSet: Array<UserFavouritesType>;
  sessioncalendarinviteSet: Array<SessionCalendarInviteType>;
  recordingDurationText?: Maybe<Scalars["String"]>;
  calendarInvitesInitiated?: Maybe<Scalars["Int"]>;
  calendarInvitesSent?: Maybe<Scalars["Int"]>;
  calendarInvitesAccepted?: Maybe<Scalars["Int"]>;
  calendarInvitesDeclined?: Maybe<Scalars["Int"]>;
  calendarInvitesTentative?: Maybe<Scalars["Int"]>;
  calendarInvitesNeedsAction?: Maybe<Scalars["Int"]>;
  isLeadingTheSession?: Maybe<Scalars["Boolean"]>;
  sessionEndDateTime?: Maybe<Scalars["DateTime"]>;
};

export type GroupSessionInstanceUpdateInput = {
  groupSessionTeacherList?: Maybe<Array<Maybe<GroupSessionInstanceInput>>>;
};

export type GroupSessionPaginatedType = {
  __typename?: "GroupSessionPaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<GroupSessionType>>>;
};

export type GroupSessionPeopleJoiningType = {
  __typename?: "GroupSessionPeopleJoiningType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  groupSessionInstance: GroupSessionInstanceType;
  user?: Maybe<UserType>;
  userReminderEmail?: Maybe<Scalars["DateTime"]>;
  userFeedbackEmail?: Maybe<Scalars["DateTime"]>;
  sessionRegistrationPlatform?: Maybe<Scalars["String"]>;
  hasJoined: Scalars["Boolean"];
  sessionJoiningPlatform?: Maybe<Scalars["String"]>;
};

export type GroupSessionReportDataInput = {
  at: Scalars["String"];
  platform: Scalars["String"];
  groupUuid?: Maybe<Scalars["ID"]>;
};

export enum GroupSessionStatus {
  Scheduled = "SCHEDULED",
  Cancelled = "CANCELLED",
}

export type GroupSessionType = {
  __typename?: "GroupSessionType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  groupSessionFor: GroupSessionGroupSessionFor;
  photo?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  service: ServiceType;
  classObj: ClassModelType;
  description: Scalars["String"];
  startDate: Scalars["Date"];
  stopDate?: Maybe<Scalars["Date"]>;
  repeatWeekly: Scalars["Boolean"];
  startTime?: Maybe<Scalars["String"]>;
  endTime?: Maybe<Scalars["String"]>;
  displayEndTime?: Maybe<Scalars["Time"]>;
  classType: ClassTypeType;
  preparationMaterial: Scalars["String"];
  corporateCompany?: Maybe<CorporateCompanyType>;
  pillar?: Maybe<PillarType>;
  calendarInviteTitle?: Maybe<Scalars["String"]>;
  calendarInviteDescription?: Maybe<Scalars["String"]>;
  status: GroupSessionStatus;
  reasonForCancellation?: Maybe<Scalars["String"]>;
  cancelledAt?: Maybe<Scalars["DateTime"]>;
  cancelledBy?: Maybe<UserType>;
  groupsessioninstanceSet: Array<GroupSessionInstanceType>;
  day?: Maybe<Scalars["String"]>;
  duration?: Maybe<Scalars["Int"]>;
};

export type GroupSessionUpdateInput = {
  groupSessionFor?: Maybe<Scalars["String"]>;
  photo?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  serviceID?: Maybe<Scalars["ID"]>;
  classID?: Maybe<Scalars["ID"]>;
  description?: Maybe<Scalars["String"]>;
  startDate?: Maybe<Scalars["Date"]>;
  repeatWeekly?: Maybe<Scalars["Boolean"]>;
  stopDate?: Maybe<Scalars["Date"]>;
  startTime?: Maybe<Scalars["Time"]>;
  endTime?: Maybe<Scalars["Time"]>;
  displayEndTime?: Maybe<Scalars["Time"]>;
  classTypeID?: Maybe<Scalars["ID"]>;
  preparationMaterial?: Maybe<Scalars["String"]>;
  corporateCompany?: Maybe<Scalars["ID"]>;
  pillar?: Maybe<Scalars["String"]>;
  calendarInviteTitle?: Maybe<Scalars["String"]>;
  calendarInviteDescription?: Maybe<Scalars["String"]>;
};

export type ImageInput = {
  __typename?: "ImageInput";
  id: Scalars["String"];
  label: Scalars["String"];
  required: Scalars["Boolean"];
  value?: Maybe<Scalars["String"]>;
};

export type InformSupportMailType = {
  __typename?: "InformSupportMailType";
  sentMail?: Maybe<Scalars["Boolean"]>;
};

export type Input =
  | SelectInput
  | MultiSelectInput
  | TextInput
  | DateInput
  | BooleanInput
  | RangeInput
  | ImageInput;

export type InputScreens = SingleInputScreen | MultipleInputsScreen;

export type IntroScreen = {
  __typename?: "IntroScreen";
  imageUrl: Scalars["String"];
  titleHtml: Scalars["String"];
  subtitleHtml: Scalars["String"];
  buttonText: Scalars["String"];
  skipButtonText: Scalars["String"];
  logoutButtonText: Scalars["String"];
};

export type InvitationType = {
  __typename?: "InvitationType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  session: ClassSessionType;
  guestUser?: Maybe<StudentDetailType>;
  guestUserEmail?: Maybe<Scalars["String"]>;
  hasAccepted: Scalars["Boolean"];
  hasJoined: Scalars["Boolean"];
};

export type IsUpgradeNeededType = {
  __typename?: "IsUpgradeNeededType";
  upgradeNeeded?: Maybe<Scalars["Boolean"]>;
};

export type JoinGroupSession = {
  __typename?: "JoinGroupSession";
  ok: Scalars["Boolean"];
  zoomMtgNumber: Scalars["String"];
  zoomMtgPassWord: Scalars["String"];
  zoomMtgSignature: Scalars["String"];
};

export type JoinGroupSessionInput = {
  groupSessionInstanceId: Scalars["ID"];
  sessionJoiningPlatform: Scalars["String"];
};

export type Learner = {
  __typename?: "Learner";
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  fullName: Scalars["String"];
  companyName: Scalars["String"];
  photoUrl?: Maybe<Scalars["String"]>;
  onboarding?: Maybe<LearnerOnboardingForm>;
  afterGroupSessionFeedbackForm?: Maybe<LearnerAfterGroupSessionFeedbackForm>;
  screens: LearnerScreens;
  biometrics?: Maybe<LearnerBiometrics>;
};

export type LearnerAfterGroupSessionFeedbackForm = {
  __typename?: "LearnerAfterGroupSessionFeedbackForm";
  messages: Array<Maybe<FeedbackMessage>>;
  biometricsBubble?: Maybe<LearnerBiometricsSessionFeedbackBubble>;
};

export type LearnerArticle = {
  __typename?: "LearnerArticle";
  id: Scalars["ID"];
  title: Scalars["String"];
  subtitle: Scalars["String"];
  readTime: Scalars["String"];
  pillarLabel: PillarLabel;
  filterTags: Array<Scalars["String"]>;
  imageUrl: Scalars["String"];
  contentHtml: Scalars["String"];
  isFavourite: Scalars["Boolean"];
};

export type LearnerArticlesContentList =
  | LearnerFeaturedArticleList
  | LearnerArticlesList;

export type LearnerArticlesList = LearnerContentListInterface & {
  __typename?: "LearnerArticlesList";
  id: Scalars["String"];
  label: Scalars["String"];
  filters: Array<Maybe<MultiSelectInput>>;
  filterTags?: Maybe<Array<Scalars["String"]>>;
  services?: Maybe<Array<Scalars["String"]>>;
  pillarLabels?: Maybe<Array<Scalars["String"]>>;
  durations?: Maybe<Array<Scalars["String"]>>;
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  items: Array<LearnerArticle>;
};

export type LearnerArticlesListItemsArgs = {
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type LearnerArticlesScreen = {
  __typename?: "LearnerArticlesScreen";
  title: Scalars["String"];
  contentList: LearnerArticlesList;
  filteredContentList: LearnerArticlesList;
  landingContentLists: Array<LearnerArticlesContentList>;
};

export type LearnerArticlesScreenContentListArgs = {
  filters?: Maybe<LearnerContentListFilters>;
};

export type LearnerArticlesScreenFilteredContentListArgs = {
  filters?: Maybe<LearnerContentListFilters>;
};

export type LearnerBeforeGroupSessionFeedbackForm = {
  __typename?: "LearnerBeforeGroupSessionFeedbackForm";
  messages: Array<Maybe<FeedbackMessage>>;
  biometricsBubble?: Maybe<LearnerBiometricsSessionFeedbackBubble>;
};

export type LearnerBeforeJoiningGroupSessionFeedbackForm = {
  __typename?: "LearnerBeforeJoiningGroupSessionFeedbackForm";
  title: Scalars["String"];
  messages: Array<Maybe<Message>>;
  buttonText: Scalars["String"];
  biometricsBubble?: Maybe<LearnerBiometricsSessionFeedbackBubble>;
};

export type LearnerBiometrics = {
  __typename?: "LearnerBiometrics";
  vitalUserId?: Maybe<Scalars["ID"]>;
  providers: Array<LearnerBiometricsProvider>;
  hasHealthData: Scalars["Boolean"];
  modal?: Maybe<LearnerBiometricsModal>;
};

export type LearnerBiometricsConnectProvider = {
  __typename?: "LearnerBiometricsConnectProvider";
  ok: Scalars["Boolean"];
  learner: Learner;
  vitalUserId: Scalars["String"];
  vitalLinkToken: Scalars["String"];
  vitalLinkUrl: Scalars["String"];
};

export type LearnerBiometricsDeleteHealthData = {
  __typename?: "LearnerBiometricsDeleteHealthData";
  ok: Scalars["Boolean"];
  learner: Learner;
};

export type LearnerBiometricsDeviceConnection = {
  __typename?: "LearnerBiometricsDeviceConnection";
  intro: LearnerBiometricsDeviceConnectionIntro;
  input: SingleInputScreen;
  missingDeviceInput: SingleInputScreen;
  ready: LearnerBiometricsDeviceConnectionReady;
};

export type LearnerBiometricsDeviceConnectionIntro = {
  __typename?: "LearnerBiometricsDeviceConnectionIntro";
  sections: Array<Maybe<LearnerBiometricsDeviceConnectionIntroSection>>;
  buttonText: Scalars["String"];
};

export type LearnerBiometricsDeviceConnectionIntroSection = {
  __typename?: "LearnerBiometricsDeviceConnectionIntroSection";
  title: Scalars["String"];
  contentHtml: Scalars["String"];
};

export type LearnerBiometricsDeviceConnectionReady = {
  __typename?: "LearnerBiometricsDeviceConnectionReady";
  title: Scalars["String"];
  contentHtml: Scalars["String"];
  buttonText: Scalars["String"];
};

export type LearnerBiometricsDisconnectProvider = {
  __typename?: "LearnerBiometricsDisconnectProvider";
  ok: Scalars["Boolean"];
  learner: Learner;
};

export type LearnerBiometricsHowItWorks = {
  __typename?: "LearnerBiometricsHowItWorks";
  title: Scalars["String"];
  headingTitle: Scalars["String"];
  headingContentHtml: Scalars["String"];
  callToAction?: Maybe<LearnerBiometricsHowItWorksCallToAction>;
  sections: Array<LearnerBiometricsHowItWorksSection>;
};

export type LearnerBiometricsHowItWorksCallToAction = {
  __typename?: "LearnerBiometricsHowItWorksCallToAction";
  title: Scalars["String"];
  buttonText: Scalars["String"];
};

export type LearnerBiometricsHowItWorksSection = {
  __typename?: "LearnerBiometricsHowItWorksSection";
  title: Scalars["String"];
  items: Array<LearnerBiometricsHowItWorksSectionItem>;
};

export type LearnerBiometricsHowItWorksSectionItem = {
  __typename?: "LearnerBiometricsHowItWorksSectionItem";
  title: Scalars["String"];
  contentHtml: Scalars["String"];
};

export type LearnerBiometricsModal = {
  __typename?: "LearnerBiometricsModal";
  title: Scalars["String"];
  contentHtml: Scalars["String"];
  tellMeMoreButtonText: Scalars["String"];
  remindMeLaterButtonText: Scalars["String"];
  dontAskAgainButtonText: Scalars["String"];
};

export type LearnerBiometricsModalDontAskAgain = {
  __typename?: "LearnerBiometricsModalDontAskAgain";
  ok: Scalars["Boolean"];
  learner: Learner;
};

export type LearnerBiometricsModalRemindMeLater = {
  __typename?: "LearnerBiometricsModalRemindMeLater";
  ok: Scalars["Boolean"];
  learner: Learner;
};

export type LearnerBiometricsModalTellMeMore = {
  __typename?: "LearnerBiometricsModalTellMeMore";
  ok: Scalars["Boolean"];
  learner: Learner;
};

export type LearnerBiometricsProvider = {
  __typename?: "LearnerBiometricsProvider";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type LearnerBiometricsProviders = {
  __typename?: "LearnerBiometricsProviders";
  title: Scalars["String"];
  providers: Array<LearnerBiometricsProvider>;
};

export type LearnerBiometricsReportMissingDevice = {
  __typename?: "LearnerBiometricsReportMissingDevice";
  ok: Scalars["Boolean"];
};

export type LearnerBiometricsSessionFeedbackBubble = {
  __typename?: "LearnerBiometricsSessionFeedbackBubble";
  title: Scalars["String"];
  contentHtml: Scalars["String"];
};

export type LearnerBiometricsSettings = {
  __typename?: "LearnerBiometricsSettings";
  providers: LearnerBiometricsProviders;
  howItWorks: LearnerBiometricsHowItWorks;
};

export type LearnerCalendarSettings = {
  __typename?: "LearnerCalendarSettings";
  title: Scalars["String"];
  toggles: Array<BooleanInput>;
};

export type LearnerContentList =
  | LearnerFeaturedSessionList
  | LearnerSessionsList
  | LearnerGroupSessionsList
  | LearnerPrivateSessionsList
  | LearnerRecordingsList
  | LearnerFeaturedRecordingList
  | LearnerFeaturedArticleList
  | LearnerArticlesList
  | LearnerPractitionersList;

export type LearnerContentListFilters = {
  services?: Maybe<Array<Maybe<Scalars["String"]>>>;
  practitioners?: Maybe<Array<Maybe<Scalars["String"]>>>;
  durations?: Maybe<Array<Maybe<Scalars["String"]>>>;
  pillarLabel?: Maybe<PillarLabel>;
  pillarLabels?: Maybe<Array<Maybe<PillarLabel>>>;
};

export type LearnerContentListInterface = {
  id: Scalars["String"];
  label: Scalars["String"];
  filters: Array<Maybe<MultiSelectInput>>;
  filterTags?: Maybe<Array<Scalars["String"]>>;
  services?: Maybe<Array<Scalars["String"]>>;
  pillarLabels?: Maybe<Array<Scalars["String"]>>;
  durations?: Maybe<Array<Scalars["String"]>>;
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type LearnerContentScreen = {
  __typename?: "LearnerContentScreen";
  contentLists: Array<Maybe<LearnerContentList>>;
};

export type LearnerContentScreenContentListsArgs = {
  filters?: Maybe<LearnerContentListFilters>;
};

export type LearnerEquipment = {
  __typename?: "LearnerEquipment";
  id: Scalars["ID"];
  label: Scalars["String"];
  icon: Scalars["String"];
};

export type LearnerExercise = {
  __typename?: "LearnerExercise";
  title: Scalars["String"];
  subTitle: Scalars["String"];
  videoUrl: Scalars["String"];
  videoThumbnailUrl: Scalars["String"];
  buttonText: Scalars["String"];
};

export type LearnerExternalAssessmentComplete = {
  __typename?: "LearnerExternalAssessmentComplete";
  ok: Scalars["Boolean"];
  learner: Learner;
};

export type LearnerFavorableItem =
  | LearnerRecording
  | LearnerArticle
  | LearnerPractitioner;

export type LearnerFavourite = {
  __typename?: "LearnerFavourite";
  ok: Scalars["Boolean"];
  item: LearnerFavorableItem;
};

export type LearnerFavourites = {
  __typename?: "LearnerFavourites";
  title: Scalars["String"];
  recordings: LearnerFavouritesRecordings;
  articles: LearnerFavouritesArticles;
};

export type LearnerFavouritesArticles = {
  __typename?: "LearnerFavouritesArticles";
  count: Scalars["Int"];
  label: Scalars["String"];
  contentList: LearnerArticlesList;
};

export type LearnerFavouritesRecordings = {
  __typename?: "LearnerFavouritesRecordings";
  count: Scalars["Int"];
  label: Scalars["String"];
  contentList: LearnerRecordingsList;
};

export type LearnerFavouritesScreen = {
  __typename?: "LearnerFavouritesScreen";
  title: Scalars["String"];
  recordingsList: LearnerRecordingsList;
  articlesList: LearnerArticlesList;
};

export type LearnerFeaturedArticleList = LearnerContentListInterface & {
  __typename?: "LearnerFeaturedArticleList";
  id: Scalars["String"];
  label: Scalars["String"];
  filters: Array<Maybe<MultiSelectInput>>;
  filterTags?: Maybe<Array<Scalars["String"]>>;
  services?: Maybe<Array<Scalars["String"]>>;
  pillarLabels?: Maybe<Array<Scalars["String"]>>;
  durations?: Maybe<Array<Scalars["String"]>>;
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  items: Array<LearnerArticle>;
};

export type LearnerFeaturedArticleListItemsArgs = {
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type LearnerFeaturedRecordingList = LearnerContentListInterface & {
  __typename?: "LearnerFeaturedRecordingList";
  id: Scalars["String"];
  label: Scalars["String"];
  filters: Array<Maybe<MultiSelectInput>>;
  filterTags?: Maybe<Array<Scalars["String"]>>;
  services?: Maybe<Array<Scalars["String"]>>;
  pillarLabels?: Maybe<Array<Scalars["String"]>>;
  durations?: Maybe<Array<Scalars["String"]>>;
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  items: Array<LearnerRecording>;
};

export type LearnerFeaturedRecordingListItemsArgs = {
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type LearnerFeaturedSessionList = LearnerContentListInterface & {
  __typename?: "LearnerFeaturedSessionList";
  id: Scalars["String"];
  label: Scalars["String"];
  filters: Array<Maybe<MultiSelectInput>>;
  filterTags?: Maybe<Array<Scalars["String"]>>;
  services?: Maybe<Array<Scalars["String"]>>;
  pillarLabels?: Maybe<Array<Scalars["String"]>>;
  durations?: Maybe<Array<Scalars["String"]>>;
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  items: Array<LearnerSession>;
};

export type LearnerFeaturedSessionListItemsArgs = {
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type LearnerGroupSession = LearnerSessionInterface & {
  __typename?: "LearnerGroupSession";
  id: Scalars["ID"];
  title: Scalars["String"];
  subtitle: Scalars["String"];
  date: Scalars["String"];
  time: Scalars["String"];
  timeZone: Scalars["String"];
  about: Scalars["String"];
  equipment?: Maybe<Array<LearnerEquipment>>;
  preparation?: Maybe<LearnerSessionPreparation>;
  pillarLabel: PillarLabel;
  service: Scalars["String"];
  duration: Scalars["String"];
  filterTags: Array<Scalars["String"]>;
  imageUrl: Scalars["String"];
  practitioner: LearnerPractitioner;
  /** @deprecated Use buttons instead. */
  actionButtons: Array<LearnerGroupSessionActionButton>;
  buttons: LearnerGroupSessionActionButtons;
  biometrics?: Maybe<LearnerSessionBiometrics>;
};

export enum LearnerGroupSessionAction {
  Register = "REGISTER",
  Unregister = "UNREGISTER",
  Join = "JOIN",
  TrackBiometrics = "TRACK_BIOMETRICS",
}

export type LearnerGroupSessionActionButton = {
  __typename?: "LearnerGroupSessionActionButton";
  style: ButtonStyle;
  action?: Maybe<LearnerGroupSessionAction>;
  text: Scalars["String"];
};

export type LearnerGroupSessionActionButtons = {
  __typename?: "LearnerGroupSessionActionButtons";
  join?: Maybe<LearnerGroupSessionActionButton>;
  register?: Maybe<LearnerGroupSessionActionButton>;
  unRegister?: Maybe<LearnerGroupSessionActionButton>;
  trackBiometrics?: Maybe<LearnerGroupSessionActionButton>;
};

export type LearnerGroupSessionFeedbackInput = {
  id: Scalars["String"];
  value: Scalars["String"];
};

export type LearnerGroupSessionsContentList =
  | LearnerFeaturedSessionList
  | LearnerGroupSessionsList;

export type LearnerGroupSessionsList = LearnerContentListInterface & {
  __typename?: "LearnerGroupSessionsList";
  id: Scalars["String"];
  label: Scalars["String"];
  filters: Array<Maybe<MultiSelectInput>>;
  filterTags?: Maybe<Array<Scalars["String"]>>;
  services?: Maybe<Array<Scalars["String"]>>;
  pillarLabels?: Maybe<Array<Scalars["String"]>>;
  durations?: Maybe<Array<Scalars["String"]>>;
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  items: Array<LearnerGroupSession>;
};

export type LearnerGroupSessionsListItemsArgs = {
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type LearnerGroupSessionsScreen = {
  __typename?: "LearnerGroupSessionsScreen";
  title: Scalars["String"];
  contentList: LearnerGroupSessionsList;
  filteredContentList: LearnerGroupSessionsList;
  landingContentLists: Array<LearnerGroupSessionsContentList>;
};

export type LearnerGroupSessionsScreenContentListArgs = {
  filters?: Maybe<LearnerContentListFilters>;
};

export type LearnerGroupSessionsScreenFilteredContentListArgs = {
  filters?: Maybe<LearnerContentListFilters>;
};

export type LearnerIndexBiometrics = {
  __typename?: "LearnerIndexBiometrics";
  sessionsHistory: LearnerIndexBiometricsSessionsHistory;
};

export type LearnerIndexBiometricsSessionsHistory = {
  __typename?: "LearnerIndexBiometricsSessionsHistory";
  state: LearnerIndexBiometricsSessionsHistoryState;
  contentList: LearnerGroupSessionsList;
  callToActionTitle?: Maybe<Scalars["String"]>;
  callToActionContentHtml?: Maybe<Scalars["String"]>;
  callToActionButtonText?: Maybe<Scalars["String"]>;
};

export enum LearnerIndexBiometricsSessionsHistoryState {
  DeviceNotConnected = "DEVICE_NOT_CONNECTED",
  NoSessionHistory = "NO_SESSION_HISTORY",
  HasSessionHistory = "HAS_SESSION_HISTORY",
}

export type LearnerIndexBreakdown = {
  __typename?: "LearnerIndexBreakdown";
  energy: LearnerIndexBreakdownPillar;
  resilience: LearnerIndexBreakdownPillar;
  activity: LearnerIndexBreakdownPillar;
};

export type LearnerIndexBreakdownPillar = {
  __typename?: "LearnerIndexBreakdownPillar";
  pillarLabel: PillarLabel;
  title: Scalars["String"];
  subtitle: Scalars["String"];
  score: LearnerIndexScore;
  descriptionHtml: Scalars["String"];
  contentLists: Array<LearnerIndexBreakdownPillarContentList>;
};

export type LearnerIndexBreakdownPillarContentList =
  LearnerContentListInterface & {
    __typename?: "LearnerIndexBreakdownPillarContentList";
    id: Scalars["String"];
    label: Scalars["String"];
    filters: Array<Maybe<MultiSelectInput>>;
    filterTags?: Maybe<Array<Scalars["String"]>>;
    services?: Maybe<Array<Scalars["String"]>>;
    pillarLabels?: Maybe<Array<Scalars["String"]>>;
    durations?: Maybe<Array<Scalars["String"]>>;
    searchQuery?: Maybe<Scalars["String"]>;
    first?: Maybe<Scalars["Int"]>;
    offset?: Maybe<Scalars["Int"]>;
    items: Array<LearnerIndexBreakdownPillarContentListItem>;
  };

export type LearnerIndexBreakdownPillarContentListItemsArgs = {
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type LearnerIndexBreakdownPillarContentListItem =
  | LearnerGroupSession
  | LearnerRecording
  | LearnerArticle;

export type LearnerIndexCoach = {
  __typename?: "LearnerIndexCoach";
  name: Scalars["String"];
  avatarUrl: Scalars["String"];
  messageTextHtml: Scalars["String"];
  externalAssessmentButton?: Maybe<ExternalAssessmentButton>;
};

export type LearnerIndexProgress = {
  __typename?: "LearnerIndexProgress";
  title: Scalars["String"];
  labels: Array<Scalars["String"]>;
  minValue: Scalars["Int"];
  maxValue: Scalars["Int"];
  energyData: LearnerIndexProgressData;
  resilienceData: LearnerIndexProgressData;
  activityData: LearnerIndexProgressData;
};

export type LearnerIndexProgressData = {
  __typename?: "LearnerIndexProgressData";
  label: Scalars["String"];
  values: Array<Scalars["Int"]>;
};

export type LearnerIndexScore = {
  __typename?: "LearnerIndexScore";
  value?: Maybe<Scalars["String"]>;
  valueFloat?: Maybe<Scalars["Float"]>;
  labelHtml: Scalars["String"];
  icon?: Maybe<Scalars["String"]>;
  pattern?: Maybe<Scalars["WONEGeneratorPattern"]>;
  externalAssessmentButton?: Maybe<ExternalAssessmentButton>;
};

export type LearnerIndexScreen = {
  __typename?: "LearnerIndexScreen";
  score?: Maybe<LearnerIndexScore>;
  exercise?: Maybe<LearnerExercise>;
  heartrate?: Maybe<Scalars["String"]>;
  coach?: Maybe<LearnerIndexCoach>;
  breakdown?: Maybe<LearnerIndexBreakdown>;
  progress?: Maybe<LearnerIndexProgress>;
  biometrics?: Maybe<LearnerIndexBiometrics>;
};

export type LearnerJoinGroupSession = {
  __typename?: "LearnerJoinGroupSession";
  ok: Scalars["Boolean"];
  /** @deprecated Use learner_before_group_session_feedback_form instead */
  learnerBeforeJoiningGroupSessionFeedbackForm: LearnerBeforeJoiningGroupSessionFeedbackForm;
  learnerBeforeGroupSessionFeedbackForm?: Maybe<LearnerBeforeGroupSessionFeedbackForm>;
  zoomMtgNumber: Scalars["String"];
  zoomMtgPassWord?: Maybe<Scalars["String"]>;
  zoomMtgSignature: Scalars["String"];
};

export type LearnerJourney = {
  __typename?: "LearnerJourney";
  title: Scalars["String"];
  memberSince: Scalars["String"];
  discover?: Maybe<WelcomeScreen>;
  timeInvested?: Maybe<LearnerJourneyTimeInvested>;
  sessionsAttended?: Maybe<LearnerJourneySessionsAttended>;
};

export type LearnerJourneySessionsAttended = {
  __typename?: "LearnerJourneySessionsAttended";
  value: Scalars["String"];
  label: Scalars["String"];
};

export type LearnerJourneyTimeInvested = {
  __typename?: "LearnerJourneyTimeInvested";
  value: Scalars["String"];
  label: Scalars["String"];
  metric: Scalars["String"];
};

export type LearnerMembership = {
  __typename?: "LearnerMembership";
  title: Scalars["String"];
  type: Scalars["String"];
  advantages: LearnerMembershipAdvantages;
};

export type LearnerMembershipAdvantage = {
  __typename?: "LearnerMembershipAdvantage";
  name: Scalars["String"];
  description: Scalars["String"];
};

export type LearnerMembershipAdvantages = {
  __typename?: "LearnerMembershipAdvantages";
  heading: Scalars["String"];
  items: Array<LearnerMembershipAdvantage>;
};

export type LearnerNotificationsSettings = {
  __typename?: "LearnerNotificationsSettings";
  title: Scalars["String"];
  toggles: Array<BooleanInput>;
};

export type LearnerOnboarding = {
  __typename?: "LearnerOnboarding";
  ok: Scalars["Boolean"];
  learner: Learner;
  welcomeScreen: WelcomeScreen;
};

export type LearnerOnboardingForm = {
  __typename?: "LearnerOnboardingForm";
  intro: IntroScreen;
  inputs: Array<InputScreens>;
  animation: Array<Maybe<ProgressAnimationFrame>>;
};

export type LearnerOnboardingInput = {
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  gender?: Maybe<Scalars["String"]>;
  birthday?: Maybe<Scalars["String"]>;
  woneDays?: Maybe<Array<Maybe<Scalars["String"]>>>;
  woneDayTimings?: Maybe<Array<Maybe<Scalars["String"]>>>;
  stressFrequency?: Maybe<Scalars["String"]>;
  calendarPermission?: Maybe<Scalars["Boolean"]>;
  notificationsEnabled?: Maybe<Scalars["Boolean"]>;
};

export type LearnerOurMission = {
  __typename?: "LearnerOurMission";
  title: Scalars["String"];
  heading: Scalars["String"];
  imageUrl: Scalars["String"];
  contentHtml: Scalars["String"];
  isFavourite: Scalars["Boolean"];
};

export type LearnerPractitioner = {
  __typename?: "LearnerPractitioner";
  id: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  fullName: Scalars["String"];
  photoUrl: Scalars["String"];
  landscapeImageUrl?: Maybe<Scalars["String"]>;
  services: Scalars["String"];
  about: Scalars["String"];
  accreditation?: Maybe<LearnerPractitionerAccreditation>;
  intro?: Maybe<LearnerPractitionerIntro>;
  contentLists: Array<LearnerPractitionerContentList>;
  isFavourite: Scalars["Boolean"];
};

export type LearnerPractitionerAccreditation = {
  __typename?: "LearnerPractitionerAccreditation";
  title: Scalars["String"];
  items?: Maybe<Array<Scalars["String"]>>;
  textHtml?: Maybe<Scalars["String"]>;
};

export type LearnerPractitionerContentList =
  | LearnerSessionsList
  | LearnerGroupSessionsList
  | LearnerPrivateSessionsList
  | LearnerRecordingsList;

export type LearnerPractitionerIntro = {
  __typename?: "LearnerPractitionerIntro";
  title: Scalars["String"];
  textHtml?: Maybe<Scalars["String"]>;
  videoUrl: Scalars["String"];
  videoThumbnailUrl: Scalars["String"];
};

export type LearnerPractitionersList = LearnerContentListInterface & {
  __typename?: "LearnerPractitionersList";
  id: Scalars["String"];
  label: Scalars["String"];
  filters: Array<Maybe<MultiSelectInput>>;
  filterTags?: Maybe<Array<Scalars["String"]>>;
  services?: Maybe<Array<Scalars["String"]>>;
  pillarLabels?: Maybe<Array<Scalars["String"]>>;
  durations?: Maybe<Array<Scalars["String"]>>;
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  items: Array<LearnerPractitioner>;
};

export type LearnerPractitionersListItemsArgs = {
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type LearnerPrivateSession = LearnerSessionInterface & {
  __typename?: "LearnerPrivateSession";
  id: Scalars["ID"];
  title: Scalars["String"];
  subtitle: Scalars["String"];
  date: Scalars["String"];
  time: Scalars["String"];
  timeZone: Scalars["String"];
  about: Scalars["String"];
  equipment?: Maybe<Array<LearnerEquipment>>;
  preparation?: Maybe<LearnerSessionPreparation>;
  pillarLabel: PillarLabel;
  service: Scalars["String"];
  duration: Scalars["String"];
  filterTags: Array<Scalars["String"]>;
  imageUrl: Scalars["String"];
  practitioner: LearnerPractitioner;
  /** @deprecated Use buttons instead. */
  actionButtons: Array<LearnerGroupSessionActionButton>;
  buttons: LearnerGroupSessionActionButtons;
  biometrics?: Maybe<LearnerSessionBiometrics>;
};

export type LearnerPrivateSessionsList = LearnerContentListInterface & {
  __typename?: "LearnerPrivateSessionsList";
  id: Scalars["String"];
  label: Scalars["String"];
  filters: Array<Maybe<MultiSelectInput>>;
  filterTags?: Maybe<Array<Scalars["String"]>>;
  services?: Maybe<Array<Scalars["String"]>>;
  pillarLabels?: Maybe<Array<Scalars["String"]>>;
  durations?: Maybe<Array<Scalars["String"]>>;
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  items: Array<LearnerPrivateSession>;
};

export type LearnerPrivateSessionsListItemsArgs = {
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type LearnerProfileScreen = {
  __typename?: "LearnerProfileScreen";
  journey: LearnerJourney;
  favourites?: Maybe<LearnerFavourites>;
  settings?: Maybe<LearnerSettings>;
  contentLists: Array<LearnerGroupSessionsList>;
};

export type LearnerProfileSettings = {
  __typename?: "LearnerProfileSettings";
  title: Scalars["String"];
  fields: LearnerProfileSettingsFields;
};

export type LearnerProfileSettingsFields = {
  __typename?: "LearnerProfileSettingsFields";
  photoUrl: ImageInput;
  firstName: TextInput;
  lastName: TextInput;
  injuries: TextInput;
  birthday: DateInput;
  gender: SelectInput;
};

export type LearnerRecording = {
  __typename?: "LearnerRecording";
  id: Scalars["ID"];
  title: Scalars["String"];
  subtitle: Scalars["String"];
  pillarLabel: PillarLabel;
  service: Scalars["String"];
  filterTags: Array<Scalars["String"]>;
  videoUrl: Scalars["String"];
  videoThumbnailUrl: Scalars["String"];
  videoDurationText: Scalars["String"];
  sessionDuration: Scalars["String"];
  imageUrl: Scalars["String"];
  about: Scalars["String"];
  equipment?: Maybe<Array<LearnerEquipment>>;
  practitioner: LearnerPractitioner;
  isFavourite: Scalars["Boolean"];
};

export type LearnerRecordingsContentList =
  | LearnerFeaturedRecordingList
  | LearnerRecordingsList;

export type LearnerRecordingsList = LearnerContentListInterface & {
  __typename?: "LearnerRecordingsList";
  id: Scalars["String"];
  label: Scalars["String"];
  filters: Array<Maybe<MultiSelectInput>>;
  filterTags?: Maybe<Array<Scalars["String"]>>;
  services?: Maybe<Array<Scalars["String"]>>;
  pillarLabels?: Maybe<Array<Scalars["String"]>>;
  durations?: Maybe<Array<Scalars["String"]>>;
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  items: Array<LearnerRecording>;
};

export type LearnerRecordingsListItemsArgs = {
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type LearnerRecordingsScreen = {
  __typename?: "LearnerRecordingsScreen";
  title: Scalars["String"];
  contentList: LearnerRecordingsList;
  filteredContentList: LearnerRecordingsList;
  landingContentLists: Array<LearnerRecordingsContentList>;
};

export type LearnerRecordingsScreenContentListArgs = {
  filters?: Maybe<LearnerContentListFilters>;
};

export type LearnerRecordingsScreenFilteredContentListArgs = {
  filters?: Maybe<LearnerContentListFilters>;
};

export type LearnerRegisterForGroupSession = {
  __typename?: "LearnerRegisterForGroupSession";
  ok: Scalars["Boolean"];
  learnerGroupSession: LearnerGroupSession;
};

export type LearnerScheduleScreen = {
  __typename?: "LearnerScheduleScreen";
  title: Scalars["String"];
  contentLists: Array<LearnerSessionsList>;
};

export type LearnerScreens = {
  __typename?: "LearnerScreens";
  you: LearnerYouScreen;
  sessions: LearnerGroupSessionsScreen;
  schedule: LearnerScheduleScreen;
  index: LearnerIndexScreen;
  recordings: LearnerRecordingsScreen;
  articles: LearnerArticlesScreen;
  /** @deprecated No longer needed */
  favourites?: Maybe<LearnerFavouritesScreen>;
  /** @deprecated No longer needed */
  content?: Maybe<LearnerContentScreen>;
  profile: LearnerProfileScreen;
};

export type LearnerSession = LearnerGroupSession | LearnerPrivateSession;

export type LearnerSessionBiometrics = {
  __typename?: "LearnerSessionBiometrics";
  id: Scalars["ID"];
  label: Scalars["String"];
  /** @deprecated Use heartrateGraph instead */
  heartrate?: Maybe<LearnerSessionBiometricsHeartrate>;
  heartrateGraph?: Maybe<LearnerSessionBiometricsHeartrateGraph>;
};

export type LearnerSessionBiometricsHeartrate = {
  __typename?: "LearnerSessionBiometricsHeartrate";
  startValue: Scalars["String"];
  endValue: Scalars["String"];
  differenceLabel: Scalars["String"];
  differenceValue: Scalars["String"];
  minValue: Scalars["Int"];
  maxValue: Scalars["Int"];
  labels: Array<Scalars["String"]>;
  values: Array<Scalars["Int"]>;
};

export type LearnerSessionBiometricsHeartrateGraph = {
  __typename?: "LearnerSessionBiometricsHeartrateGraph";
  startValueLabel: Scalars["String"];
  endValueLabel: Scalars["String"];
  diffMessage: Scalars["String"];
  diffValueLabel: Scalars["String"];
  minValue: Scalars["Int"];
  maxValue: Scalars["Int"];
  stepValue: Scalars["Int"];
  values: Array<Scalars["Float"]>;
  minTimeValue: Scalars["Int"];
  maxTimeValue: Scalars["Int"];
  stepTimeValue: Scalars["Int"];
  timeValues: Array<Scalars["Float"]>;
};

export type LearnerSessionInterface = {
  id: Scalars["ID"];
  title: Scalars["String"];
  subtitle: Scalars["String"];
  date: Scalars["String"];
  time: Scalars["String"];
  timeZone: Scalars["String"];
  about: Scalars["String"];
  equipment?: Maybe<Array<LearnerEquipment>>;
  preparation?: Maybe<LearnerSessionPreparation>;
  pillarLabel: PillarLabel;
  service: Scalars["String"];
  duration: Scalars["String"];
  filterTags: Array<Scalars["String"]>;
  imageUrl: Scalars["String"];
  practitioner: LearnerPractitioner;
  /** @deprecated Use buttons instead. */
  actionButtons: Array<LearnerGroupSessionActionButton>;
  buttons: LearnerGroupSessionActionButtons;
  biometrics?: Maybe<LearnerSessionBiometrics>;
};

export type LearnerSessionPreparation = {
  __typename?: "LearnerSessionPreparation";
  title: Scalars["String"];
  textHtml?: Maybe<Scalars["String"]>;
};

export type LearnerSessionsList = LearnerContentListInterface & {
  __typename?: "LearnerSessionsList";
  id: Scalars["String"];
  label: Scalars["String"];
  filters: Array<Maybe<MultiSelectInput>>;
  filterTags?: Maybe<Array<Scalars["String"]>>;
  services?: Maybe<Array<Scalars["String"]>>;
  pillarLabels?: Maybe<Array<Scalars["String"]>>;
  durations?: Maybe<Array<Scalars["String"]>>;
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  items: Array<LearnerSession>;
};

export type LearnerSessionsListItemsArgs = {
  searchQuery?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type LearnerSettings = {
  __typename?: "LearnerSettings";
  title: Scalars["String"];
  canChangePassword: Scalars["Boolean"];
  profile: LearnerProfileSettings;
  notifications: LearnerNotificationsSettings;
  calendar: LearnerCalendarSettings;
  ourMission: LearnerOurMission;
  membership: LearnerMembership;
  biometrics?: Maybe<LearnerBiometricsSettings>;
};

export type LearnerSubmitAfterGroupSessionFeedback = {
  __typename?: "LearnerSubmitAfterGroupSessionFeedback";
  ok: Scalars["Boolean"];
};

export type LearnerSubmitBeforeGroupSessionFeedback = {
  __typename?: "LearnerSubmitBeforeGroupSessionFeedback";
  ok: Scalars["Boolean"];
};

export type LearnerTrackBiometrics = {
  __typename?: "LearnerTrackBiometrics";
  ok: Scalars["Boolean"];
  learner: Learner;
};

export type LearnerUnFavourite = {
  __typename?: "LearnerUnFavourite";
  ok: Scalars["Boolean"];
  item: LearnerFavorableItem;
};

export type LearnerUnRegisterForGroupSession = {
  __typename?: "LearnerUnRegisterForGroupSession";
  ok: Scalars["Boolean"];
  learnerGroupSession: LearnerGroupSession;
};

export type LearnerUpdateCalendarSettingsToggle = {
  __typename?: "LearnerUpdateCalendarSettingsToggle";
  ok: Scalars["Boolean"];
  learner: Learner;
};

export type LearnerUpdateHoursPerWeek = {
  __typename?: "LearnerUpdateHoursPerWeek";
  ok: Scalars["Boolean"];
  learner: Learner;
};

export type LearnerUpdateNotificationSettingsToggle = {
  __typename?: "LearnerUpdateNotificationSettingsToggle";
  ok: Scalars["Boolean"];
  learner: Learner;
};

export type LearnerUpdateProfileSettings = {
  __typename?: "LearnerUpdateProfileSettings";
  ok: Scalars["Boolean"];
  learner: Learner;
};

export type LearnerUpdateProfileSettingsInput = {
  photoUrl?: Maybe<Scalars["String"]>;
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  gender: Scalars["String"];
  injuries?: Maybe<Scalars["String"]>;
  birthday?: Maybe<Scalars["String"]>;
};

export type LearnerYouScreen = {
  __typename?: "LearnerYouScreen";
  welcome: WelcomeScreen;
  indexScore?: Maybe<LearnerIndexScore>;
  contentLists: Array<LearnerContentList>;
};

export type LocationType = {
  __typename?: "LocationType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  name: Scalars["String"];
  studentdetailSet: Array<StudentDetailType>;
  onboardingSet: Array<OnboardingType>;
  teacherdetailSet: Array<TeacherDetailType>;
};

export type ManualEmailTriggerType = {
  __typename?: "ManualEmailTriggerType";
  sessionType?: Maybe<Scalars["String"]>;
  sessionId?: Maybe<Scalars["ID"]>;
  sentTo?: Maybe<Scalars["String"]>;
  sentMail?: Maybe<Scalars["Boolean"]>;
};

export type ManualPushNotificationTriggerType = {
  __typename?: "ManualPushNotificationTriggerType";
  sessionType?: Maybe<Scalars["String"]>;
  sessionId?: Maybe<Scalars["ID"]>;
  sentTo?: Maybe<Scalars["String"]>;
  userType?: Maybe<Scalars["String"]>;
  sentPn?: Maybe<Scalars["Boolean"]>;
};

export type Message = {
  __typename?: "Message";
  senderAvatarUrl: Scalars["String"];
  senderName: Scalars["String"];
  textHtml: Scalars["String"];
  input?: Maybe<Input>;
};

export type MoodType = {
  __typename?: "MoodType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  before: Scalars["Int"];
  after?: Maybe<Scalars["Int"]>;
  student?: Maybe<StudentDetailType>;
  session: ClassSessionType;
};

export type MultiSelectInput = {
  __typename?: "MultiSelectInput";
  id: Scalars["String"];
  label: Scalars["String"];
  required: Scalars["Boolean"];
  options: Array<SelectInputOption>;
};

export type MultipleInputsScreen = {
  __typename?: "MultipleInputsScreen";
  id: Scalars["String"];
  titleHtml: Scalars["String"];
  subtitleHtml?: Maybe<Scalars["String"]>;
  inputs: Array<Input>;
  buttonText?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createUpdateFcmDevice?: Maybe<CreateUpdateFcmDevice>;
  signIn?: Maybe<SignIn>;
  userSessionLink?: Maybe<UserSessionLink>;
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  verifyToken?: Maybe<Verify>;
  refreshToken?: Maybe<Refresh>;
  changePassword?: Maybe<ChangePassword>;
  resetPassword?: Maybe<ResetPassword>;
  resetPasswordWithLink?: Maybe<ResetPasswordWithLink>;
  changePasswordWithLink?: Maybe<ChangePasswordWithLink>;
  createUser?: Maybe<CreateUser>;
  updateUser?: Maybe<UpdateUser>;
  deleteUser?: Maybe<DeleteUser>;
  createRole?: Maybe<CreateRole>;
  updateRole?: Maybe<UpdateRole>;
  deleteRole?: Maybe<DeleteRole>;
  createUserdetail?: Maybe<CreateUserDetail>;
  updateUserdetail?: Maybe<UpdateUserDetail>;
  updateTimezone?: Maybe<UpdateTimezone>;
  reportRecordingOpen?: Maybe<ReportRecordingOpen>;
  reportRecordingVideoStart?: Maybe<ReportRecordingVideoStart>;
  reportRecordingVideoProgress?: Maybe<ReportRecordingVideoProgress>;
  reportRecordingVideoEnd?: Maybe<ReportRecordingVideoEnd>;
  reportArticleOpen?: Maybe<ReportArticleOpen>;
  reportArticleScrollStart?: Maybe<ReportArticleScrollStart>;
  reportArticleScrollProgress?: Maybe<ReportArticleScrollProgress>;
  reportArticleScrollEnd?: Maybe<ReportArticleScrollEnd>;
  reportGroupSessionLeft?: Maybe<ReportGroupSessionLeft>;
  reportGroupSessionPing?: Maybe<ReportGroupSessionPing>;
  vitalLink?: Maybe<VitalLink>;
  vitalDeleteUser?: Maybe<VitalDeleteUser>;
  vitalCreateUser?: Maybe<VitalCreateUser>;
  vitalDeregisterProvider?: Maybe<VitalDeregisterProvider>;
  userSurvey?: Maybe<CreateUserSurvey>;
  createStudentdetail?: Maybe<CreateStudentDetail>;
  updateStudentdetail?: Maybe<UpdateStudentDetail>;
  deleteStudentdetail?: Maybe<DeleteStudentDetail>;
  createQuestion?: Maybe<CreateQuestion>;
  updateQuestion?: Maybe<UpdateQuestion>;
  deleteQuestion?: Maybe<DeleteQuestion>;
  createOnboarding?: Maybe<CreateOnboarding>;
  deleteOnboarding?: Maybe<DeleteOnboarding>;
  createLocation?: Maybe<CreateLocation>;
  updateLocation?: Maybe<UpdateLocation>;
  deleteLocation?: Maybe<DeleteLocation>;
  createAddress?: Maybe<CreateAddress>;
  updateAddress?: Maybe<UpdateAddress>;
  deleteAddress?: Maybe<DeleteAddress>;
  createPlan?: Maybe<CreatePlan>;
  updatePlan?: Maybe<UpdatePlan>;
  deletePlan?: Maybe<DeletePlan>;
  createCategory?: Maybe<CreateCategory>;
  updateCategory?: Maybe<UpdateCategory>;
  deleteCategory?: Maybe<DeleteCategory>;
  createArticle?: Maybe<CreateArticle>;
  updateArticle?: Maybe<UpdateArticle>;
  deleteArticle?: Maybe<DeleteArticle>;
  createTeacherLevel?: Maybe<CreateTeacherLevel>;
  updateTeacherLevel?: Maybe<UpdateTeacherLevel>;
  deleteTeacherLevel?: Maybe<DeleteTeacherLevel>;
  createTeacherdetail?: Maybe<CreateTeacherDetail>;
  updateTeacherdetail?: Maybe<UpdateTeacherDetail>;
  activateDeactivateTeacher?: Maybe<DeactivateTeacher>;
  createTeacherbankdetail?: Maybe<CreateTeacherBankDetail>;
  updateTeacherbankdetail?: Maybe<UpdateTeacherBankDetail>;
  deleteTeacherbankdetail?: Maybe<DeleteTeacherBankDetail>;
  createTeachercalendar?: Maybe<CreateTeacherCalendar>;
  updateTeachercalendar?: Maybe<UpdateTeacherCalendar>;
  deleteTeachercalendar?: Maybe<DeleteTeacherCalendar>;
  CDTeacherCalendarList?: Maybe<CdTeacherCalendarList>;
  createTeachercalendardayoff?: Maybe<CreateTeacherCalendarDayOff>;
  updateTeachercalendardayoff?: Maybe<UpdateTeacherCalendarDayOff>;
  deleteTeachercalendardayoff?: Maybe<DeleteTeacherCalendarDayOff>;
  createClassType?: Maybe<CreateClassType>;
  updateClassType?: Maybe<UpdateClassType>;
  deleteClassType?: Maybe<DeleteClassType>;
  createDuration?: Maybe<CreateDuration>;
  updateDuration?: Maybe<UpdateDuration>;
  deleteDuration?: Maybe<DeleteDuration>;
  createService?: Maybe<CreateService>;
  updateService?: Maybe<UpdateService>;
  deleteService?: Maybe<DeleteService>;
  createClass?: Maybe<CreateClass>;
  updateClass?: Maybe<UpdateClass>;
  deleteClass?: Maybe<DeleteClass>;
  createCorporateCompany?: Maybe<CreateCorporateCompany>;
  updateCorporateCompany?: Maybe<UpdateCorporateCompany>;
  deleteCorporateCompany?: Maybe<DeleteCorporateCompany>;
  deleteCorporateLocation?: Maybe<DeleteCompanyLocation>;
  selfServeCorporateSignUp?: Maybe<SelfServeSignUp>;
  selfServeCorporateSignIn?: Maybe<SelfServeSignIn>;
  selfServeAddMembers?: Maybe<SelfServeAddMembers>;
  selfServeAddSeats?: Maybe<SelfServeAddSeats>;
  selfServeRemoveSeats?: Maybe<SelfServeRemoveSeats>;
  createCorporateCompanyAdmin?: Maybe<CreateCorporateCompanyAdmin>;
  updateCorporateCompanyAdmin?: Maybe<UpdateCorporateCompanyAdmin>;
  deleteCorporateCompanyAdmin?: Maybe<DeleteCorporateCompanyAdmin>;
  createGroupSession?: Maybe<CreateGroupSession>;
  updateGroupSession?: Maybe<UpdateGroupSession>;
  deleteGroupSession?: Maybe<DeleteGroupSession>;
  cancelGroupSession?: Maybe<CancelGroupSession>;
  updateGroupSessionInstance?: Maybe<UpdateGroupSessionInstance>;
  joinGroupSession?: Maybe<JoinGroupSession>;
  registerForGroupSession?: Maybe<RegisterForGroupSession>;
  userJoinedGroupSession?: Maybe<UserJoinedGroupSession>;
  unRegisterForGroupSession?: Maybe<UnRegisterForGroupSession>;
  createClassSession?: Maybe<CreateClassSession>;
  updateClassSession?: Maybe<UpdateClassSession>;
  createUpdateCreditValue?: Maybe<CreateUpdateCreditValue>;
  createPackage?: Maybe<CreatePackage>;
  updatePackage?: Maybe<UpdatePackage>;
  deletePackage?: Maybe<DeletePackage>;
  createPromoCode?: Maybe<CreatePromoCode>;
  updatePromoCode?: Maybe<UpdatePromoCode>;
  deletePromoCode?: Maybe<DeletePromoCode>;
  createPricingSystem?: Maybe<CreatePricingSystem>;
  updatePricingSystem?: Maybe<UpdatePricingSystem>;
  deletePricingSystem?: Maybe<DeletePricingSystem>;
  createEphemeralKey?: Maybe<CreateEphemeralKey>;
  createPaymentIntent?: Maybe<CreatePaymentIntent>;
  createPayment?: Maybe<CreatePayment>;
  createAccessToken?: Maybe<CreateAccessToken>;
  stopRecording?: Maybe<StopRecording>;
  sendWebMail?: Maybe<SendWebMail>;
  createTeacherFeedbackByStudent?: Maybe<CreateTeacherFeedbackByStudent>;
  updateTeacherFeedbackByStudent?: Maybe<UpdateTeacherFeedbackByStudent>;
  createStudentFeedbackByTeacher?: Maybe<CreateStudentFeedbackByTeacher>;
  updateStudentFeedbackByTeacher?: Maybe<UpdateStudentFeedbackByTeacher>;
  createMood?: Maybe<CreateMood>;
  updateMood?: Maybe<UpdateMood>;
  createGroupFeedback?: Maybe<CreateGroupSessionFeedbackByTeacher>;
  createUpdateGroupFeedback?: Maybe<CreateUpdateGroupSessionFeedbackByTeacher>;
  createUpdateTeacherSessionNotes?: Maybe<CreateUpdateTeacherSessionNotes>;
  createEmployee?: Maybe<CreateEmployee>;
  deactivateEmployee?: Maybe<DeactivateEmployee>;
  createCompanyLocation?: Maybe<CreateCompanyLocation>;
  updateCompanyLocation?: Maybe<UpdateCompanyLocation>;
  deleteCompanyLocation?: Maybe<DeleteCompanyLocation>;
  createSessionFeedback?: Maybe<CreateSessionFeedback>;
  createUpdateSessionFeedback?: Maybe<CreateUpdateSessionFeedback>;
  oneTimeUpdateSessionFeedback?: Maybe<OneTimeUpdateSessionFeedback>;
  createAppFeedback?: Maybe<CreateAppFeedback>;
  createEmailTemplate?: Maybe<CreateEmailTemplate>;
  updateEmailTemplate?: Maybe<UpdateEmailTemplate>;
  createUpdateUserNotificationPermissions?: Maybe<CreateUpdateUserNotificationPermissions>;
  createUpdateUserFavourites?: Maybe<CreateUpdateUserFavourites>;
  deleteSentCalendarInvites?: Maybe<DeleteSentCalendarInvites>;
  updateSentCalendarInvites?: Maybe<UpdateSentCalendarInvites>;
  sendCalendarInvites?: Maybe<SendCalendarInvites>;
  deleteDuplicateCalendarInvites?: Maybe<DeleteDuplicateCalendarInvites>;
  signOut?: Maybe<SignOut>;
  learnerOnboarding?: Maybe<LearnerOnboarding>;
  learnerJoinGroupSession?: Maybe<LearnerJoinGroupSession>;
  learnerSubmitBeforeGroupSessionFeedback?: Maybe<LearnerSubmitBeforeGroupSessionFeedback>;
  learnerSubmitAfterGroupSessionFeedback?: Maybe<LearnerSubmitAfterGroupSessionFeedback>;
  learnerRegisterForGroupSession?: Maybe<LearnerRegisterForGroupSession>;
  learnerUnRegisterForGroupSession?: Maybe<LearnerUnRegisterForGroupSession>;
  learnerTrackBiometrics?: Maybe<LearnerTrackBiometrics>;
  learnerFavourite?: Maybe<LearnerFavourite>;
  learnerUnFavourite?: Maybe<LearnerUnFavourite>;
  learnerUpdateHoursPerWeek?: Maybe<LearnerUpdateHoursPerWeek>;
  learnerUpdateProfileSettings?: Maybe<LearnerUpdateProfileSettings>;
  learnerUpdateNotificationSettingsToggle?: Maybe<LearnerUpdateNotificationSettingsToggle>;
  learnerUpdateCalendarSettingsToggle?: Maybe<LearnerUpdateCalendarSettingsToggle>;
  learnerExternalAssessmentComplete?: Maybe<LearnerExternalAssessmentComplete>;
  learnerBiometricsConnectProvider?: Maybe<LearnerBiometricsConnectProvider>;
  learnerBiometricsReportMissingDevice?: Maybe<LearnerBiometricsReportMissingDevice>;
  learnerBiometricsDisconnectProvider?: Maybe<LearnerBiometricsDisconnectProvider>;
  learnerBiometricsDeleteHealthData?: Maybe<LearnerBiometricsDeleteHealthData>;
  learnerBiometricsModalTellMeMore?: Maybe<LearnerBiometricsModalTellMeMore>;
  learnerBiometricsModalRemindMeLater?: Maybe<LearnerBiometricsModalRemindMeLater>;
  learnerBiometricsModalDontAskAgain?: Maybe<LearnerBiometricsModalDontAskAgain>;
  createCompanySignUpLink?: Maybe<CreateCompanySignUpLink>;
  deleteCompanySignUpLink?: Maybe<DeleteCompanySignUpLink>;
  triggerLearnerVerificationEmail?: Maybe<TriggerLearnerVerificationEmail>;
  requestSignInWithMagicLink?: Maybe<RequestSignInWithMagicLink>;
};

export type MutationCreateUpdateFcmDeviceArgs = {
  input: FcmDeviceInput;
};

export type MutationSignInArgs = {
  appInfo?: Maybe<AppInfo>;
  input: SignInInput;
};

export type MutationUserSessionLinkArgs = {
  input: UserSessionLinkInput;
};

export type MutationTokenAuthArgs = {
  username: Scalars["String"];
  password: Scalars["String"];
};

export type MutationVerifyTokenArgs = {
  token?: Maybe<Scalars["String"]>;
};

export type MutationRefreshTokenArgs = {
  token?: Maybe<Scalars["String"]>;
};

export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};

export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};

export type MutationResetPasswordWithLinkArgs = {
  input: ResetPasswordInput;
};

export type MutationChangePasswordWithLinkArgs = {
  input: ChangePasswordInputWithLink;
};

export type MutationCreateUserArgs = {
  input: UserCreateInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars["ID"];
  input: UserUpdateInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars["ID"];
};

export type MutationCreateRoleArgs = {
  name: Scalars["String"];
};

export type MutationUpdateRoleArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationDeleteRoleArgs = {
  id: Scalars["ID"];
};

export type MutationCreateUserdetailArgs = {
  input: UserDetailCreateInput;
};

export type MutationUpdateUserdetailArgs = {
  input: UserDetailUpdateInput;
  userObj: Scalars["ID"];
};

export type MutationUpdateTimezoneArgs = {
  timezone: Scalars["String"];
};

export type MutationReportRecordingOpenArgs = {
  at: Scalars["String"];
  platform: Scalars["String"];
  recordingId: Scalars["ID"];
};

export type MutationReportRecordingVideoStartArgs = {
  at: Scalars["String"];
  groupUuid: Scalars["ID"];
  platform: Scalars["String"];
  recordingId: Scalars["ID"];
};

export type MutationReportRecordingVideoProgressArgs = {
  at: Scalars["String"];
  currentTime: Scalars["Int"];
  duration: Scalars["Int"];
  groupUuid: Scalars["ID"];
  percentage: Scalars["Int"];
  platform: Scalars["String"];
  recordingId: Scalars["ID"];
};

export type MutationReportRecordingVideoEndArgs = {
  at: Scalars["String"];
  groupUuid: Scalars["ID"];
  platform: Scalars["String"];
  recordingId: Scalars["ID"];
};

export type MutationReportArticleOpenArgs = {
  articleId: Scalars["ID"];
  at: Scalars["String"];
  platform: Scalars["String"];
};

export type MutationReportArticleScrollStartArgs = {
  articleId: Scalars["ID"];
  at: Scalars["String"];
  groupUuid: Scalars["ID"];
  platform: Scalars["String"];
};

export type MutationReportArticleScrollProgressArgs = {
  articleId: Scalars["ID"];
  at: Scalars["String"];
  groupUuid: Scalars["ID"];
  percentage: Scalars["Int"];
  platform: Scalars["String"];
};

export type MutationReportArticleScrollEndArgs = {
  articleId: Scalars["ID"];
  at: Scalars["String"];
  groupUuid: Scalars["ID"];
  platform: Scalars["String"];
};

export type MutationReportGroupSessionLeftArgs = {
  groupSessionInstanceId: Scalars["ID"];
  input: GroupSessionReportDataInput;
};

export type MutationReportGroupSessionPingArgs = {
  groupSessionInstanceId: Scalars["ID"];
  input: GroupSessionReportDataInput;
};

export type MutationVitalLinkArgs = {
  providerId: Scalars["String"];
};

export type MutationVitalDeregisterProviderArgs = {
  providerId: Scalars["String"];
};

export type MutationUserSurveyArgs = {
  input: UserSurveyInput;
};

export type MutationCreateStudentdetailArgs = {
  input: StudentDetailCreateInput;
};

export type MutationUpdateStudentdetailArgs = {
  id: Scalars["ID"];
  input: StudentDetailUpdateInput;
};

export type MutationDeleteStudentdetailArgs = {
  id: Scalars["ID"];
};

export type MutationCreateQuestionArgs = {
  input: QuestionCreateInput;
};

export type MutationUpdateQuestionArgs = {
  id: Scalars["ID"];
  input: QuestionUpdateInput;
};

export type MutationDeleteQuestionArgs = {
  id: Scalars["ID"];
};

export type MutationCreateOnboardingArgs = {
  input: OnboardingInput;
};

export type MutationDeleteOnboardingArgs = {
  id: Scalars["ID"];
};

export type MutationCreateLocationArgs = {
  name: Scalars["String"];
};

export type MutationUpdateLocationArgs = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type MutationDeleteLocationArgs = {
  id: Scalars["ID"];
};

export type MutationCreateAddressArgs = {
  input: AddressInput;
  userID?: Maybe<Scalars["ID"]>;
};

export type MutationUpdateAddressArgs = {
  id: Scalars["ID"];
  input: AddressInput;
};

export type MutationDeleteAddressArgs = {
  id: Scalars["ID"];
};

export type MutationCreatePlanArgs = {
  input: PlanCreateInput;
};

export type MutationUpdatePlanArgs = {
  id: Scalars["ID"];
  input: PlanUpdateInput;
};

export type MutationDeletePlanArgs = {
  id: Scalars["ID"];
};

export type MutationCreateCategoryArgs = {
  input: CategoryCreateInput;
};

export type MutationUpdateCategoryArgs = {
  id: Scalars["ID"];
  input: CategoryUpdateInput;
};

export type MutationDeleteCategoryArgs = {
  id: Scalars["ID"];
};

export type MutationCreateArticleArgs = {
  input: ArticleCreateInput;
};

export type MutationUpdateArticleArgs = {
  id: Scalars["ID"];
  input: ArticleUpdateInput;
};

export type MutationDeleteArticleArgs = {
  id: Scalars["ID"];
};

export type MutationCreateTeacherLevelArgs = {
  level: Scalars["String"];
};

export type MutationUpdateTeacherLevelArgs = {
  id: Scalars["ID"];
  level: Scalars["String"];
};

export type MutationDeleteTeacherLevelArgs = {
  id: Scalars["ID"];
};

export type MutationCreateTeacherdetailArgs = {
  input: TeacherDetailCreateInput;
};

export type MutationUpdateTeacherdetailArgs = {
  id: Scalars["ID"];
  input: TeacherDetailUpdateInput;
};

export type MutationActivateDeactivateTeacherArgs = {
  id: Scalars["ID"];
};

export type MutationCreateTeacherbankdetailArgs = {
  input: TeacherBankDetailCreateInput;
};

export type MutationUpdateTeacherbankdetailArgs = {
  id: Scalars["ID"];
  input: TeacherBankDetailUpdateInput;
};

export type MutationDeleteTeacherbankdetailArgs = {
  id: Scalars["ID"];
};

export type MutationCreateTeachercalendarArgs = {
  input: TeacherCalendarCreateInput;
};

export type MutationUpdateTeachercalendarArgs = {
  id: Scalars["ID"];
  input: TeacherCalendarUpdateInput;
};

export type MutationDeleteTeachercalendarArgs = {
  id: Scalars["ID"];
};

export type MutationCdTeacherCalendarListArgs = {
  input: TeacherCalendarListCdInput;
};

export type MutationCreateTeachercalendardayoffArgs = {
  input: TeacherCalendarDaysOffCreateInput;
};

export type MutationUpdateTeachercalendardayoffArgs = {
  id: Scalars["ID"];
  input: TeacherCalendarDayOffUpdateInput;
};

export type MutationDeleteTeachercalendardayoffArgs = {
  id: Scalars["ID"];
};

export type MutationCreateClassTypeArgs = {
  input: ClassTypeInput;
};

export type MutationUpdateClassTypeArgs = {
  id: Scalars["ID"];
  input: ClassTypeInput;
};

export type MutationDeleteClassTypeArgs = {
  id: Scalars["ID"];
};

export type MutationCreateDurationArgs = {
  input: DurationInput;
};

export type MutationUpdateDurationArgs = {
  id: Scalars["ID"];
  input: DurationInput;
};

export type MutationDeleteDurationArgs = {
  id: Scalars["ID"];
};

export type MutationCreateServiceArgs = {
  input: ServiceCreateInput;
};

export type MutationUpdateServiceArgs = {
  id: Scalars["ID"];
  input: ServiceUpdateInput;
};

export type MutationDeleteServiceArgs = {
  id: Scalars["ID"];
};

export type MutationCreateClassArgs = {
  input: ClassCreateInput;
};

export type MutationUpdateClassArgs = {
  id: Scalars["ID"];
  input: ClassUpdateInput;
};

export type MutationDeleteClassArgs = {
  id: Scalars["ID"];
};

export type MutationCreateCorporateCompanyArgs = {
  input: CorporateCompanyCreateInput;
};

export type MutationUpdateCorporateCompanyArgs = {
  id: Scalars["ID"];
  input: CorporateCompanyUpdateInput;
};

export type MutationDeleteCorporateCompanyArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteCorporateLocationArgs = {
  id: Scalars["ID"];
};

export type MutationSelfServeCorporateSignUpArgs = {
  input: SelfServeSignUpInput;
};

export type MutationSelfServeCorporateSignInArgs = {
  input: SignInInput;
};

export type MutationSelfServeAddMembersArgs = {
  emailList: Array<Maybe<Scalars["String"]>>;
};

export type MutationSelfServeAddSeatsArgs = {
  noOfSeatsToAdd: Scalars["Int"];
};

export type MutationSelfServeRemoveSeatsArgs = {
  noOfSeatsToRemove: Scalars["Int"];
};

export type MutationCreateCorporateCompanyAdminArgs = {
  input: CorporateCompanyAdminCreateInput;
};

export type MutationUpdateCorporateCompanyAdminArgs = {
  id: Scalars["ID"];
  input: CorporateCompanyAdminUpdateInput;
};

export type MutationDeleteCorporateCompanyAdminArgs = {
  id: Scalars["ID"];
};

export type MutationCreateGroupSessionArgs = {
  input: GroupSessionCreateInput;
};

export type MutationUpdateGroupSessionArgs = {
  id: Scalars["ID"];
  input: GroupSessionUpdateInput;
};

export type MutationDeleteGroupSessionArgs = {
  id: Scalars["ID"];
  reasonForCancellation?: Maybe<Scalars["String"]>;
};

export type MutationCancelGroupSessionArgs = {
  id: Scalars["ID"];
  reasonForCancellation: Scalars["String"];
};

export type MutationUpdateGroupSessionInstanceArgs = {
  groupSessionID: Scalars["ID"];
  input: GroupSessionInstanceUpdateInput;
};

export type MutationJoinGroupSessionArgs = {
  input: JoinGroupSessionInput;
};

export type MutationRegisterForGroupSessionArgs = {
  input: RegisterForGroupSessionInput;
};

export type MutationUserJoinedGroupSessionArgs = {
  input: UserJoinedGroupSessionInput;
};

export type MutationUnRegisterForGroupSessionArgs = {
  input: RegisterForGroupSessionInput;
};

export type MutationCreateClassSessionArgs = {
  input: ClassSessionCreateInput;
};

export type MutationUpdateClassSessionArgs = {
  id: Scalars["ID"];
  input: ClassSessionUpdateInput;
};

export type MutationCreateUpdateCreditValueArgs = {
  input: CreditValueInput;
};

export type MutationCreatePackageArgs = {
  input: PackageCreateInput;
};

export type MutationUpdatePackageArgs = {
  id: Scalars["ID"];
  input: PackageUpdateInput;
};

export type MutationDeletePackageArgs = {
  id: Scalars["ID"];
};

export type MutationCreatePromoCodeArgs = {
  input: PromoCodeCreateInput;
};

export type MutationUpdatePromoCodeArgs = {
  id: Scalars["ID"];
  input: PromoCodeUpdateInput;
};

export type MutationDeletePromoCodeArgs = {
  id: Scalars["ID"];
};

export type MutationCreatePricingSystemArgs = {
  input: PricingSystemCreateInput;
};

export type MutationUpdatePricingSystemArgs = {
  id: Scalars["ID"];
  input: PricingSystemUpdateInput;
};

export type MutationDeletePricingSystemArgs = {
  id: Scalars["ID"];
};

export type MutationCreateEphemeralKeyArgs = {
  input: EphemeralKeyInput;
};

export type MutationCreatePaymentIntentArgs = {
  input: PaymentIntentInput;
};

export type MutationCreatePaymentArgs = {
  input: PaymentCreateInput;
};

export type MutationCreateAccessTokenArgs = {
  input: AccessTokenInput;
};

export type MutationStopRecordingArgs = {
  input: StopRecordingInput;
};

export type MutationSendWebMailArgs = {
  input: SendWebMailInput;
};

export type MutationCreateTeacherFeedbackByStudentArgs = {
  input: CreateTeacherFeedbackByStudentInput;
};

export type MutationUpdateTeacherFeedbackByStudentArgs = {
  id: Scalars["ID"];
  input: UpdateTeacherFeedbackByStudentInput;
};

export type MutationCreateStudentFeedbackByTeacherArgs = {
  input: CreateStudentFeedbackByTeacherInput;
};

export type MutationUpdateStudentFeedbackByTeacherArgs = {
  id: Scalars["ID"];
  input: UpdateStudentFeedbackByTeacherInput;
};

export type MutationCreateMoodArgs = {
  input: CreateMoodInput;
};

export type MutationUpdateMoodArgs = {
  id: Scalars["ID"];
  input: UpdateMoodInput;
};

export type MutationCreateGroupFeedbackArgs = {
  input: GroupSessionFeedbackByTeacherInput;
};

export type MutationCreateUpdateGroupFeedbackArgs = {
  input: GroupSessionFeedbackByTeacherInput;
};

export type MutationCreateUpdateTeacherSessionNotesArgs = {
  input: CreateUpdateTeacherSessionNotesInput;
};

export type MutationCreateEmployeeArgs = {
  input: CreateEmployeeInput;
};

export type MutationDeactivateEmployeeArgs = {
  id: Scalars["ID"];
};

export type MutationCreateCompanyLocationArgs = {
  input: CompanyLocationCreateInput;
};

export type MutationUpdateCompanyLocationArgs = {
  id: Scalars["ID"];
  input: CompanyLocationUpdateInput;
};

export type MutationDeleteCompanyLocationArgs = {
  id: Scalars["ID"];
};

export type MutationCreateSessionFeedbackArgs = {
  input: CreateSessionFeedbackInput;
};

export type MutationCreateUpdateSessionFeedbackArgs = {
  input: CreateUpdateSessionFeedbackInput;
};

export type MutationCreateAppFeedbackArgs = {
  input: CreateAppFeedbackInput;
};

export type MutationCreateEmailTemplateArgs = {
  input: EmailTemplateCreateInput;
};

export type MutationUpdateEmailTemplateArgs = {
  id: Scalars["ID"];
  input: EmailTemplateUpdateInput;
};

export type MutationCreateUpdateUserNotificationPermissionsArgs = {
  input: UserNotificationPermissionsInput;
};

export type MutationCreateUpdateUserFavouritesArgs = {
  input: UserFavouritesInput;
};

export type MutationDeleteSentCalendarInvitesArgs = {
  calendarEventIdList?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  fromDateTime?: Maybe<Scalars["DateTime"]>;
  groupSessionInstanceIdList?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  toDateTime?: Maybe<Scalars["DateTime"]>;
};

export type MutationUpdateSentCalendarInvitesArgs = {
  calendarEventIdList?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  groupSessionInstanceId?: Maybe<Scalars["ID"]>;
};

export type MutationSendCalendarInvitesArgs = {
  input: SendCalendarInvitesInput;
};

export type MutationSignOutArgs = {
  appInfo?: Maybe<AppInfo>;
};

export type MutationLearnerOnboardingArgs = {
  appInfo: AppInfo;
  input: LearnerOnboardingInput;
};

export type MutationLearnerJoinGroupSessionArgs = {
  appInfo: AppInfo;
  id: Scalars["ID"];
};

export type MutationLearnerSubmitBeforeGroupSessionFeedbackArgs = {
  appInfo: AppInfo;
  groupSessionId: Scalars["ID"];
  input: Array<Maybe<LearnerGroupSessionFeedbackInput>>;
  type: Scalars["String"];
};

export type MutationLearnerSubmitAfterGroupSessionFeedbackArgs = {
  appInfo: AppInfo;
  groupSessionId: Scalars["ID"];
  input: Array<Maybe<LearnerGroupSessionFeedbackInput>>;
  type: Scalars["String"];
};

export type MutationLearnerRegisterForGroupSessionArgs = {
  appInfo: AppInfo;
  id: Scalars["ID"];
};

export type MutationLearnerUnRegisterForGroupSessionArgs = {
  appInfo: AppInfo;
  id: Scalars["ID"];
};

export type MutationLearnerTrackBiometricsArgs = {
  appInfo: AppInfo;
};

export type MutationLearnerFavouriteArgs = {
  appInfo: AppInfo;
  id: Scalars["ID"];
  typename: Scalars["String"];
};

export type MutationLearnerUnFavouriteArgs = {
  appInfo: AppInfo;
  id: Scalars["ID"];
  typename: Scalars["String"];
};

export type MutationLearnerUpdateHoursPerWeekArgs = {
  appInfo: AppInfo;
  value: Scalars["Int"];
};

export type MutationLearnerUpdateProfileSettingsArgs = {
  appInfo: AppInfo;
  input: LearnerUpdateProfileSettingsInput;
};

export type MutationLearnerUpdateNotificationSettingsToggleArgs = {
  appInfo: AppInfo;
  checked: Scalars["Boolean"];
  id: Scalars["ID"];
};

export type MutationLearnerUpdateCalendarSettingsToggleArgs = {
  appInfo: AppInfo;
  checked: Scalars["Boolean"];
  id: Scalars["ID"];
};

export type MutationLearnerExternalAssessmentCompleteArgs = {
  appInfo: AppInfo;
};

export type MutationLearnerBiometricsConnectProviderArgs = {
  appInfo: AppInfo;
  id: Scalars["ID"];
};

export type MutationLearnerBiometricsReportMissingDeviceArgs = {
  appInfo: AppInfo;
  deviceName: Scalars["String"];
};

export type MutationLearnerBiometricsDisconnectProviderArgs = {
  appInfo: AppInfo;
  id: Scalars["ID"];
};

export type MutationLearnerBiometricsDeleteHealthDataArgs = {
  appInfo: AppInfo;
};

export type MutationLearnerBiometricsModalTellMeMoreArgs = {
  appInfo: AppInfo;
};

export type MutationLearnerBiometricsModalRemindMeLaterArgs = {
  appInfo: AppInfo;
};

export type MutationLearnerBiometricsModalDontAskAgainArgs = {
  appInfo: AppInfo;
};

export type MutationCreateCompanySignUpLinkArgs = {
  id: Scalars["ID"];
  timeZone: Scalars["String"];
};

export type MutationDeleteCompanySignUpLinkArgs = {
  id: Scalars["ID"];
};

export type MutationTriggerLearnerVerificationEmailArgs = {
  appInfo: AppInfo;
  companyToken: Scalars["String"];
  email: Scalars["String"];
};

export type MutationRequestSignInWithMagicLinkArgs = {
  appInfo: AppInfo;
  email: Scalars["String"];
};

export type ObtainJsonWebToken = {
  __typename?: "ObtainJSONWebToken";
  payload: Scalars["GenericScalar"];
  refreshExpiresIn: Scalars["Int"];
  token: Scalars["String"];
};

export type OnboardingInput = {
  studentdetailID: Scalars["ID"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  city?: Maybe<Scalars["String"]>;
  locationID?: Maybe<Scalars["ID"]>;
  planList?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  wellbeingHours?: Maybe<Scalars["Int"]>;
  sendNotifications?: Maybe<Scalars["Boolean"]>;
  injuries?: Maybe<Scalars["String"]>;
  pillarName?: Maybe<Scalars["String"]>;
  isPermissionToSendCalendarInvites?: Maybe<Scalars["Boolean"]>;
};

export type OnboardingType = {
  __typename?: "OnboardingType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  studentdetailObj: StudentDetailType;
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  city?: Maybe<Scalars["String"]>;
  isLondon: Scalars["Boolean"];
  location?: Maybe<LocationType>;
  plans: Array<PlanType>;
  wellbeingHours?: Maybe<Scalars["Int"]>;
  sendNotifications?: Maybe<Scalars["Boolean"]>;
  injuries?: Maybe<Scalars["String"]>;
  pillar?: Maybe<PillarType>;
  learnerOnboardingData?: Maybe<Scalars["JSONString"]>;
};

export type OneTimeUpdateSessionFeedback = {
  __typename?: "OneTimeUpdateSessionFeedback";
  ok?: Maybe<Scalars["Boolean"]>;
  updatedCount?: Maybe<Scalars["Int"]>;
  updatedSessionFeedbackList?: Maybe<Array<Maybe<SessionFeedbackType>>>;
};

export type PackageCreateInput = {
  discount: Scalars["Int"];
  credit: Scalars["Int"];
};

export type PackagePaginatedType = {
  __typename?: "PackagePaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<PackageType>>>;
};

export type PackageType = {
  __typename?: "PackageType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  price?: Maybe<Scalars["Float"]>;
  credit: Scalars["Int"];
  discount: Scalars["Int"];
  paymentSet: Array<PaymentType>;
};

export type PackageUpdateInput = {
  discount?: Maybe<Scalars["Int"]>;
  credit?: Maybe<Scalars["Int"]>;
};

export type PaymentCreateInput = {
  studentID: Scalars["ID"];
  packageID: Scalars["ID"];
  paidAmount: Scalars["Float"];
  transactionDateTime: Scalars["DateTime"];
  transactionDetails: Scalars["String"];
  stripeToken: Scalars["String"];
};

export type PaymentIntentInput = {
  amount: Scalars["Int"];
  customerId: Scalars["String"];
  currency?: Maybe<Scalars["String"]>;
};

export type PaymentPaginatedType = {
  __typename?: "PaymentPaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<PaymentType>>>;
};

export type PaymentType = {
  __typename?: "PaymentType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  student?: Maybe<StudentDetailType>;
  package: PackageType;
  paidAmount?: Maybe<Scalars["Float"]>;
  transactionDateTime: Scalars["DateTime"];
  transactionDetails?: Maybe<Scalars["String"]>;
  stripeToken: Scalars["String"];
};

export enum PillarLabel {
  Energy = "ENERGY",
  Resilience = "RESILIENCE",
  Activity = "ACTIVITY",
}

export type PillarRecommendationsType = {
  __typename?: "PillarRecommendationsType";
  energy?: Maybe<RecommendationsType>;
  resilience?: Maybe<RecommendationsType>;
  activity?: Maybe<RecommendationsType>;
};

export type PillarType = {
  __typename?: "PillarType";
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  name: Scalars["String"];
  displayPhrase: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  ordering: Scalars["Int"];
  planSet: Array<PlanType>;
  articleSet: Array<ArticleType>;
  studentdetailSet: Array<StudentDetailType>;
  onboardingSet: Array<OnboardingType>;
  groupsessionSet: Array<GroupSessionType>;
};

export type PlanCreateInput = {
  photo?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  description: Scalars["String"];
  showOnSite?: Maybe<Scalars["Boolean"]>;
  displayPhrase?: Maybe<Scalars["String"]>;
};

export type PlanPaginatedType = {
  __typename?: "PlanPaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<PlanType>>>;
};

export type PlanType = {
  __typename?: "PlanType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  photo?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  description: Scalars["String"];
  displayPhrase?: Maybe<Scalars["String"]>;
  showOnSite: Scalars["Boolean"];
  doughnutColorCode: Scalars["String"];
  pillar?: Maybe<PillarType>;
  articleSet: Array<ArticleType>;
  studentdetailSet: Array<StudentDetailType>;
  onboardingSet: Array<OnboardingType>;
  classSet: Array<ClassModelType>;
  classsessionSet: Array<ClassSessionType>;
};

export type PlanUpdateInput = {
  photo?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  showOnSite?: Maybe<Scalars["Boolean"]>;
  displayPhrase?: Maybe<Scalars["String"]>;
};

export enum Platform {
  Web = "WEB",
  Ios = "IOS",
  Android = "ANDROID",
}

export type PricingSystemCreateInput = {
  classID: Scalars["ID"];
  seniorityID: Scalars["ID"];
  classTypeID: Scalars["ID"];
  durationID: Scalars["ID"];
  credit: Scalars["Int"];
};

export type PricingSystemPaginatedType = {
  __typename?: "PricingSystemPaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<PricingSystemType>>>;
};

export type PricingSystemType = {
  __typename?: "PricingSystemType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  classObj: ClassModelType;
  seniority: TeacherLevelType;
  classType: ClassTypeType;
  duration: DurationType;
  credit: Scalars["Int"];
};

export type PricingSystemUpdateInput = {
  classID?: Maybe<Scalars["ID"]>;
  seniorityID?: Maybe<Scalars["ID"]>;
  classTypeID?: Maybe<Scalars["ID"]>;
  durationID?: Maybe<Scalars["ID"]>;
  credit?: Maybe<Scalars["Int"]>;
};

export type ProgressAnimationFrame = {
  __typename?: "ProgressAnimationFrame";
  percentageStart: Scalars["Int"];
  percentageEnd: Scalars["Int"];
  transitionDurationSec: Scalars["Int"];
  textHtml: Scalars["String"];
};

export type PromoCodeCreateInput = {
  code: Scalars["String"];
  discount: Scalars["Int"];
  usageLimit: Scalars["Int"];
  maxUsagePerCustomer: Scalars["Int"];
  expiryDate: Scalars["Date"];
  classList: Array<Maybe<Scalars["ID"]>>;
};

export type PromoCodePaginatedType = {
  __typename?: "PromoCodePaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<PromoCodeType>>>;
};

export type PromoCodeType = {
  __typename?: "PromoCodeType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  code: Scalars["String"];
  discount: Scalars["Int"];
  classes: Array<ClassModelType>;
  usageLimit: Scalars["Int"];
  usageLimitRemaining: Scalars["Int"];
  maxUsagePerCustomer: Scalars["Int"];
  expiryDate: Scalars["Date"];
  classsessionSet: Array<ClassSessionType>;
};

export type PromoCodeUpdateInput = {
  code?: Maybe<Scalars["String"]>;
  discount?: Maybe<Scalars["Int"]>;
  usageLimit?: Maybe<Scalars["Int"]>;
  maxUsagePerCustomer?: Maybe<Scalars["Int"]>;
  expiryDate?: Maybe<Scalars["Date"]>;
  classList?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type Query = {
  __typename?: "Query";
  _debug?: Maybe<DjangoDebug>;
  userList?: Maybe<Array<Maybe<UserType>>>;
  user?: Maybe<UserType>;
  roleList?: Maybe<Array<Maybe<RoleType>>>;
  role?: Maybe<RoleType>;
  userDetailList?: Maybe<Array<Maybe<UserDetailType>>>;
  userDetail?: Maybe<UserDetailType>;
  studentDetailList?: Maybe<StudentDetailPaginatedType>;
  studentDetail?: Maybe<StudentDetailType>;
  questionList?: Maybe<Array<Maybe<QuestionType>>>;
  question?: Maybe<QuestionType>;
  onboardingList?: Maybe<Array<Maybe<OnboardingType>>>;
  onboarding?: Maybe<OnboardingType>;
  addressChoiceList?: Maybe<Array<Maybe<AddressChoiceType>>>;
  locationList?: Maybe<Array<Maybe<LocationType>>>;
  location?: Maybe<LocationType>;
  addressList?: Maybe<Array<Maybe<AddressType>>>;
  address?: Maybe<AddressType>;
  planList?: Maybe<PlanPaginatedType>;
  plan?: Maybe<PlanType>;
  categoryList?: Maybe<CategoryPaginatedType>;
  category?: Maybe<CategoryType>;
  articleList?: Maybe<ArticlePaginatedType>;
  article?: Maybe<ArticleType>;
  teacherLevelList?: Maybe<Array<Maybe<TeacherLevelType>>>;
  teacherLevel?: Maybe<TeacherLevelType>;
  teacherDetailList?: Maybe<TeacherDetailPaginatedType>;
  teacherDetail?: Maybe<TeacherDetailType>;
  teacherDetailPage?: Maybe<TeacherDetailPageType>;
  teacherBankDetailList?: Maybe<Array<Maybe<TeacherBankDetailType>>>;
  teacherBankDetail?: Maybe<TeacherBankDetailType>;
  teacherCalendarList?: Maybe<Array<Maybe<TeacherCalendarType>>>;
  teacherCalendar?: Maybe<TeacherCalendarType>;
  teacherCalendarDaysOffList?: Maybe<Array<Maybe<TeacherCalendarDaysOffType>>>;
  teacherCalendarDaysOff?: Maybe<TeacherCalendarDaysOffType>;
  classTypeList?: Maybe<Array<Maybe<ClassTypeType>>>;
  classType?: Maybe<ClassTypeType>;
  durationList?: Maybe<Array<Maybe<DurationType>>>;
  duration?: Maybe<DurationType>;
  serviceList?: Maybe<ServicePaginatedType>;
  service?: Maybe<ServiceType>;
  serviceTeacherList?: Maybe<Array<Maybe<TeacherDetailType>>>;
  classList?: Maybe<Array<Maybe<ClassModelType>>>;
  serviceClassList?: Maybe<Array<Maybe<ClassModelType>>>;
  classTeacherList?: Maybe<Array<Maybe<TeacherDetailType>>>;
  classData?: Maybe<ClassModelType>;
  corporateCompanyList?: Maybe<CorporateCompanyPaginatedType>;
  corporateCompany?: Maybe<CorporateCompanyType>;
  groupSessionList?: Maybe<GroupSessionPaginatedType>;
  groupSession?: Maybe<GroupSessionType>;
  groupSessionInstanceList?: Maybe<GroupSessionInstancePaginatedType>;
  groupSessionInstance?: Maybe<GroupSessionInstanceType>;
  classSessionList?: Maybe<ClassSessionPaginatedType>;
  classSession?: Maybe<ClassSessionType>;
  creditValueList?: Maybe<Array<Maybe<CreditValueType>>>;
  creditValue?: Maybe<CreditValueType>;
  packageList?: Maybe<PackagePaginatedType>;
  package?: Maybe<PackageType>;
  promoCodeList?: Maybe<PromoCodePaginatedType>;
  promoCode?: Maybe<PromoCodeType>;
  paymentList?: Maybe<PaymentPaginatedType>;
  payment?: Maybe<PaymentType>;
  pricingSystemlist?: Maybe<PricingSystemPaginatedType>;
  pricingSystem?: Maybe<PricingSystemType>;
  userSessionsToday?: Maybe<Array<Maybe<SessionUnionType>>>;
  userSessionsThisWeek?: Maybe<Array<Maybe<SessionUnionType>>>;
  practitionerRegisteredUpcomingSessions?: Maybe<
    Array<Maybe<SessionUnionType>>
  >;
  bestPractitionersForYou?: Maybe<Array<Maybe<TeacherDetailType>>>;
  bestSessionsForYou?: Maybe<Array<Maybe<ClassModelType>>>;
  recommendedArticlesForYou?: Maybe<Array<Maybe<ArticleType>>>;
  recommendedGroupSessionsForYou?: Maybe<
    Array<Maybe<GroupSessionInstanceType>>
  >;
  recommendedRecordingsForYou?: Maybe<Array<Maybe<GroupSessionInstanceType>>>;
  groupSessionTeacherAvailabilityList?: Maybe<
    Array<Maybe<GroupSessionAvailableTeacherType>>
  >;
  corporateCompanyEmployeeList?: Maybe<StudentDetailPaginatedType>;
  companyCountryEmployeeCount?: Maybe<Array<Maybe<CountryEmployeeCountType>>>;
  corporateCompanyAdminList?: Maybe<CorporateCompanyAdminPaginatedType>;
  corporateCompanyAdmin?: Maybe<CorporateCompanyAdminType>;
  corporateCompanyAdminEmail?: Maybe<CorporateCompanyAdminType>;
  companyLocationList?: Maybe<CompanyLocationPaginatedType>;
  companyLocation?: Maybe<CompanyLocationType>;
  corporateCompanyBilling?: Maybe<BillingOutputType>;
  joinOurCommunity?: Maybe<CommunityPageType>;
  upcomingGroupSessionList?: Maybe<UpcomingGroupSessionType>;
  recordingsAndArticles?: Maybe<RecordingsAndArticlesType>;
  feedbackByTeacherId?: Maybe<Array<Maybe<TeacherFeedbackByStudentType>>>;
  feedbackByTeacherIdDetail?: Maybe<TeacherFeedbackByStudentDetailType>;
  feedbackByStudentId?: Maybe<Array<Maybe<StudentFeedbackByTeacherType>>>;
  studentFeedbackByTeacherList?: Maybe<StudentFeedbackByTeacherPaginatedType>;
  studentProfilePage?: Maybe<StudentProfileType>;
  studentSessionQuerySet?: Maybe<Array<Maybe<SessionUnionType>>>;
  moodListByUser?: Maybe<Array<Maybe<MoodType>>>;
  moodListBySession?: Maybe<Array<Maybe<MoodType>>>;
  moodByMoodId?: Maybe<MoodType>;
  videoFailureInformationMail?: Maybe<InformSupportMailType>;
  sendTeacherProfileSuggestedChanges?: Maybe<InformSupportMailType>;
  classPageByID?: Maybe<ClassPageType>;
  creditsForSession?: Maybe<PricingSystemType>;
  teacherAvailabilityListByDate?: Maybe<TeacherAvailabilityListWithClassesType>;
  teacherListWithAvailabilityForDate?: Maybe<
    Array<Maybe<TeacherAvailabilityListType>>
  >;
  teacherAvailabilitiesForLocalDateTime?: Maybe<
    Array<Maybe<TeacherAvailabilityListType>>
  >;
  teacherAvailabilityForPrivateSessions?: Maybe<
    Array<Maybe<TeacherAvailabilityListType>>
  >;
  corporateDashboard?: Maybe<CorporateDashboardType>;
  corporateSessionsToday?: Maybe<Array<Maybe<GroupSessionInstanceType>>>;
  corporateSessionsThisMonth?: Maybe<Array<Maybe<GroupSessionInstanceType>>>;
  employeesDataPage?: Maybe<EmployeesData>;
  isUpgradeNeeded?: Maybe<IsUpgradeNeededType>;
  testTrigger?: Maybe<SentMailType>;
  appointmentList?: Maybe<AppointmentsPaginatedType>;
  triggerTeacherPaymentCsvWithTotal?: Maybe<StatusType>;
  triggerTeacherPaymentCsvWithoutTotal?: Maybe<StatusType>;
  websiteTeachers?: Maybe<Array<Maybe<TeacherDetailType>>>;
  convertToDateTime?: Maybe<DateTimeType>;
  manualTeacherEmailTriggers?: Maybe<Array<Maybe<ManualEmailTriggerType>>>;
  manualStudentEmailTriggers?: Maybe<Array<Maybe<ManualEmailTriggerType>>>;
  manualFeedbackTriggers?: Maybe<Array<Maybe<ManualEmailTriggerType>>>;
  manualAdminTriggers?: Maybe<SentMailType>;
  manualAdminEndOfMonthTrigers?: Maybe<SentMailType>;
  manualEmployeeWelcomeTriggers?: Maybe<EmailTriggerType>;
  manualPushNotificationTriggers?: Maybe<
    Array<Maybe<ManualPushNotificationTriggerType>>
  >;
  classRatingList?: Maybe<Array<Maybe<ClassRatingType>>>;
  feedbackCharacteristicList?: Maybe<Array<Maybe<FeedbackCharacteristicType>>>;
  sessionFeedbackListByStudentId?: Maybe<Array<Maybe<SessionFeedbackType>>>;
  sessionFeedbackBySessionId?: Maybe<SessionFeedbackType>;
  sessionFeedbackById?: Maybe<SessionFeedbackType>;
  allTeachersSessionsNotesList?: Maybe<TeacherSessionNotesTypePaginatedType>;
  emailTemplateList?: Maybe<EmailTemplatePaginatedType>;
  adminList?: Maybe<Array<Maybe<UserType>>>;
  emailTemplateByID?: Maybe<EmailTemplateType>;
  emailTemplateImageList?: Maybe<EmailTemplateImagePaginatedType>;
  userFavourites?: Maybe<UserFavouritesType>;
  addBulkCalendarEvents?: Maybe<BulkEventType>;
  updateResponseStatusOnCalendarEventsTriggered?: Maybe<UpdateEventType>;
  groupSessionInstanceListByID?: Maybe<Array<Maybe<GroupSessionInstanceType>>>;
  schedulerCalendarInvitesTrigger?: Maybe<SentMailType>;
  pillarList?: Maybe<Array<Maybe<PillarType>>>;
  resendMemberInvite?: Maybe<StatusType>;
  getSubscriptionCenterUrl?: Maybe<UrlType>;
  activeMemberList?: Maybe<Array<Maybe<StudentDetailType>>>;
  customerIOSpike?: Maybe<StatusType>;
  vitalGetProviders?: Maybe<Array<Maybe<VitalProviderType>>>;
  vitalGetConnectedProviders?: Maybe<Array<Maybe<VitalProviderType>>>;
  vitalGetLinkOauthProvider?: Maybe<VitalOAuthProviderType>;
  vitalGetLinkPasswordProvider?: Maybe<VitalOAuthProviderType>;
  vitalGetLinkEmailProvider?: Maybe<VitalOAuthProviderType>;
  learner: Learner;
  learnerSession: LearnerSession;
  learnerPractitioner: LearnerPractitioner;
  learnerRecording: LearnerRecording;
  learnerArticle: LearnerArticle;
  learnerBeforeGroupSessionFeedbackForm: LearnerBeforeGroupSessionFeedbackForm;
  learnerAfterGroupSessionFeedbackForm: LearnerAfterGroupSessionFeedbackForm;
  learnerContentList: LearnerContentList;
  learnerScreenSessions: LearnerGroupSessionsScreen;
  learnerBiometricsDeviceConnection: LearnerBiometricsDeviceConnection;
  verifyCompanyToken: VerifyToken;
};

export type QueryUserArgs = {
  email: Scalars["String"];
};

export type QueryRoleArgs = {
  id: Scalars["ID"];
};

export type QueryUserDetailArgs = {
  userObj: Scalars["ID"];
};

export type QueryStudentDetailListArgs = {
  isActive?: Maybe<Scalars["Boolean"]>;
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryStudentDetailArgs = {
  userdetailObj: Scalars["ID"];
};

export type QueryQuestionListArgs = {
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryQuestionArgs = {
  id: Scalars["ID"];
};

export type QueryOnboardingArgs = {
  studentdetailID: Scalars["ID"];
};

export type QueryLocationListArgs = {
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryLocationArgs = {
  id: Scalars["ID"];
};

export type QueryAddressArgs = {
  id: Scalars["ID"];
};

export type QueryPlanListArgs = {
  isApp?: Maybe<Scalars["Boolean"]>;
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryPlanArgs = {
  id: Scalars["ID"];
};

export type QueryCategoryListArgs = {
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryCategoryArgs = {
  id: Scalars["ID"];
};

export type QueryArticleListArgs = {
  title?: Maybe<Scalars["String"]>;
  pillarName?: Maybe<Scalars["String"]>;
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryArticleArgs = {
  id: Scalars["ID"];
};

export type QueryTeacherLevelListArgs = {
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryTeacherLevelArgs = {
  id: Scalars["ID"];
};

export type QueryTeacherDetailListArgs = {
  isActive?: Maybe<Scalars["Boolean"]>;
  classID?: Maybe<Scalars["ID"]>;
  serviceID?: Maybe<Scalars["ID"]>;
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryTeacherDetailArgs = {
  id: Scalars["ID"];
};

export type QueryTeacherDetailPageArgs = {
  id: Scalars["ID"];
};

export type QueryTeacherBankDetailArgs = {
  teacherdetailID: Scalars["ID"];
};

export type QueryTeacherCalendarListArgs = {
  teacherdetailID: Scalars["ID"];
};

export type QueryTeacherCalendarArgs = {
  id: Scalars["ID"];
};

export type QueryTeacherCalendarDaysOffListArgs = {
  teacherdetailID: Scalars["ID"];
};

export type QueryTeacherCalendarDaysOffArgs = {
  id: Scalars["ID"];
};

export type QueryClassTypeListArgs = {
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryClassTypeArgs = {
  id: Scalars["ID"];
};

export type QueryDurationListArgs = {
  classID?: Maybe<Scalars["ID"]>;
  teacherID?: Maybe<Scalars["ID"]>;
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryDurationArgs = {
  id: Scalars["ID"];
};

export type QueryServiceListArgs = {
  platform?: Maybe<Scalars["String"]>;
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryServiceArgs = {
  id: Scalars["ID"];
};

export type QueryServiceTeacherListArgs = {
  serviceID: Scalars["ID"];
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryClassListArgs = {
  platform?: Maybe<Scalars["String"]>;
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryServiceClassListArgs = {
  serviceID: Scalars["ID"];
  platform?: Maybe<Scalars["String"]>;
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryClassTeacherListArgs = {
  classID: Scalars["ID"];
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryClassDataArgs = {
  id: Scalars["ID"];
};

export type QueryCorporateCompanyListArgs = {
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryCorporateCompanyArgs = {
  id: Scalars["ID"];
  timeZone?: Maybe<Scalars["String"]>;
};

export type QueryGroupSessionListArgs = {
  groupSessionFor: Scalars["String"];
  teacherDetailID?: Maybe<Scalars["ID"]>;
  serviceID?: Maybe<Scalars["ID"]>;
  classID?: Maybe<Scalars["ID"]>;
  date?: Maybe<Scalars["Date"]>;
  companyID?: Maybe<Scalars["ID"]>;
  pillarName?: Maybe<Scalars["String"]>;
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryGroupSessionArgs = {
  id: Scalars["ID"];
};

export type QueryGroupSessionInstanceListArgs = {
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryGroupSessionInstanceArgs = {
  id: Scalars["ID"];
};

export type QueryClassSessionListArgs = {
  fromDate?: Maybe<Scalars["Date"]>;
  toDate?: Maybe<Scalars["Date"]>;
  studentDetailID?: Maybe<Scalars["ID"]>;
  companyID?: Maybe<Scalars["ID"]>;
  teacherDetailID?: Maybe<Scalars["ID"]>;
  serviceID?: Maybe<Scalars["ID"]>;
  classID?: Maybe<Scalars["ID"]>;
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryClassSessionArgs = {
  id: Scalars["ID"];
};

export type QueryCreditValueArgs = {
  id: Scalars["ID"];
};

export type QueryPackageListArgs = {
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryPackageArgs = {
  id: Scalars["ID"];
};

export type QueryPromoCodeListArgs = {
  classID?: Maybe<Scalars["ID"]>;
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryPromoCodeArgs = {
  classID?: Maybe<Scalars["ID"]>;
  id?: Maybe<Scalars["ID"]>;
  code?: Maybe<Scalars["String"]>;
};

export type QueryPaymentListArgs = {
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryPaymentArgs = {
  id: Scalars["ID"];
};

export type QueryPricingSystemlistArgs = {
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryPricingSystemArgs = {
  id: Scalars["ID"];
};

export type QueryUserSessionsTodayArgs = {
  roleName: Scalars["String"];
  date?: Maybe<Scalars["Date"]>;
  tz?: Maybe<Scalars["String"]>;
};

export type QueryUserSessionsThisWeekArgs = {
  roleName: Scalars["String"];
  tz?: Maybe<Scalars["String"]>;
};

export type QueryPractitionerRegisteredUpcomingSessionsArgs = {
  roleName: Scalars["String"];
};

export type QueryGroupSessionTeacherAvailabilityListArgs = {
  groupSessionID: Scalars["ID"];
};

export type QueryCorporateCompanyEmployeeListArgs = {
  companyID?: Maybe<Scalars["ID"]>;
  search?: Maybe<Scalars["String"]>;
  isActive?: Maybe<Scalars["Boolean"]>;
  country?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryCompanyCountryEmployeeCountArgs = {
  companyID?: Maybe<Scalars["ID"]>;
};

export type QueryCorporateCompanyAdminListArgs = {
  companyID: Scalars["ID"];
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryCorporateCompanyAdminArgs = {
  id: Scalars["ID"];
};

export type QueryCorporateCompanyAdminEmailArgs = {
  email?: Maybe<Scalars["String"]>;
};

export type QueryCompanyLocationListArgs = {
  companyID: Scalars["ID"];
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryCompanyLocationArgs = {
  id: Scalars["ID"];
};

export type QueryCorporateCompanyBillingArgs = {
  companyID?: Maybe<Scalars["ID"]>;
};

export type QueryJoinOurCommunityArgs = {
  roleName: Scalars["String"];
  practitionerID?: Maybe<Scalars["ID"]>;
  serviceID?: Maybe<Scalars["ID"]>;
  duration?: Maybe<Scalars["Int"]>;
};

export type QueryUpcomingGroupSessionListArgs = {
  isRegistered?: Maybe<Scalars["Boolean"]>;
  practitionerID?: Maybe<Scalars["ID"]>;
  serviceID?: Maybe<Scalars["ID"]>;
  duration?: Maybe<Scalars["Int"]>;
};

export type QueryFeedbackByTeacherIdArgs = {
  id: Scalars["ID"];
};

export type QueryFeedbackByTeacherIdDetailArgs = {
  id: Scalars["ID"];
};

export type QueryFeedbackByStudentIdArgs = {
  id: Scalars["ID"];
};

export type QueryStudentFeedbackByTeacherListArgs = {
  search?: Maybe<Scalars["String"]>;
  studentID?: Maybe<Scalars["ID"]>;
  teacherID?: Maybe<Scalars["ID"]>;
  fromDate?: Maybe<Scalars["Date"]>;
  toDate?: Maybe<Scalars["Date"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryStudentSessionQuerySetArgs = {
  serviceID: Scalars["ID"];
};

export type QueryMoodListByUserArgs = {
  studentID: Scalars["ID"];
};

export type QueryMoodListBySessionArgs = {
  sessionID: Scalars["ID"];
};

export type QueryMoodByMoodIdArgs = {
  id: Scalars["ID"];
};

export type QueryVideoFailureInformationMailArgs = {
  failureMessage: Scalars["String"];
  sessionID?: Maybe<Scalars["ID"]>;
  groupSessionInstanceID?: Maybe<Scalars["ID"]>;
};

export type QuerySendTeacherProfileSuggestedChangesArgs = {
  teacherID: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  biography?: Maybe<Scalars["String"]>;
  classList?: Maybe<Array<Maybe<Scalars["String"]>>>;
  photoURL?: Maybe<Scalars["String"]>;
};

export type QueryClassPageByIdArgs = {
  classID: Scalars["ID"];
};

export type QueryCreditsForSessionArgs = {
  classID: Scalars["ID"];
  seniorityID: Scalars["ID"];
  classTypeID: Scalars["ID"];
  durationID: Scalars["ID"];
};

export type QueryTeacherAvailabilityListByDateArgs = {
  teacherdetailID: Scalars["ID"];
  forDate: Scalars["Date"];
  classTypeID: Scalars["ID"];
  durationID?: Maybe<Scalars["ID"]>;
};

export type QueryTeacherListWithAvailabilityForDateArgs = {
  forDate: Scalars["Date"];
  classID: Scalars["ID"];
  locationID?: Maybe<Scalars["ID"]>;
  durationID?: Maybe<Scalars["ID"]>;
};

export type QueryTeacherAvailabilitiesForLocalDateTimeArgs = {
  forDate: Scalars["Date"];
  classID: Scalars["ID"];
  classTypeID: Scalars["ID"];
  tz?: Maybe<Scalars["String"]>;
  durationID?: Maybe<Scalars["ID"]>;
  teacherID?: Maybe<Scalars["ID"]>;
};

export type QueryTeacherAvailabilityForPrivateSessionsArgs = {
  forDate: Scalars["Date"];
  classID: Scalars["ID"];
  classTypeID: Scalars["ID"];
  tz: Scalars["String"];
  durationID?: Maybe<Scalars["ID"]>;
  teacherID?: Maybe<Scalars["ID"]>;
};

export type QueryCorporateDashboardArgs = {
  basis: Scalars["String"];
};

export type QueryCorporateSessionsTodayArgs = {
  today?: Maybe<Scalars["Date"]>;
};

export type QueryEmployeesDataPageArgs = {
  search?: Maybe<Scalars["String"]>;
};

export type QueryIsUpgradeNeededArgs = {
  appName: Scalars["String"];
  appVersion: Scalars["String"];
};

export type QueryAppointmentListArgs = {
  teacherID?: Maybe<Scalars["ID"]>;
  userID?: Maybe<Scalars["ID"]>;
  companyID?: Maybe<Scalars["ID"]>;
  classID?: Maybe<Scalars["ID"]>;
  serviceID?: Maybe<Scalars["ID"]>;
  fromDate?: Maybe<Scalars["Date"]>;
  toDate?: Maybe<Scalars["Date"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryTriggerTeacherPaymentCsvWithTotalArgs = {
  date1: Scalars["Date"];
  date2: Scalars["Date"];
};

export type QueryTriggerTeacherPaymentCsvWithoutTotalArgs = {
  date1: Scalars["Date"];
  date2: Scalars["Date"];
};

export type QueryConvertToDateTimeArgs = {
  givenDate?: Maybe<Scalars["Date"]>;
  givenTime?: Maybe<Scalars["Time"]>;
};

export type QueryManualTeacherEmailTriggersArgs = {
  indIdList: Array<Maybe<Scalars["ID"]>>;
  gsiIdList: Array<Maybe<Scalars["ID"]>>;
};

export type QueryManualStudentEmailTriggersArgs = {
  indIdList: Array<Maybe<Scalars["ID"]>>;
  gsiIdList: Array<Maybe<Scalars["ID"]>>;
};

export type QueryManualFeedbackTriggersArgs = {
  gsiIdList?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type QueryManualAdminTriggersArgs = {
  isFriday?: Maybe<Scalars["Boolean"]>;
  isMonday?: Maybe<Scalars["Boolean"]>;
};

export type QueryManualEmployeeWelcomeTriggersArgs = {
  employeeList: Array<Maybe<Scalars["String"]>>;
};

export type QueryManualPushNotificationTriggersArgs = {
  privateSessionIdList?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  gsiIdList?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type QuerySessionFeedbackListByStudentIdArgs = {
  studentID: Scalars["ID"];
};

export type QuerySessionFeedbackBySessionIdArgs = {
  sessionID: Scalars["ID"];
};

export type QuerySessionFeedbackByIdArgs = {
  id: Scalars["ID"];
};

export type QueryAllTeachersSessionsNotesListArgs = {
  teacherID?: Maybe<Scalars["ID"]>;
  userID?: Maybe<Scalars["ID"]>;
  fromDate?: Maybe<Scalars["Date"]>;
  toDate?: Maybe<Scalars["Date"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  search?: Maybe<Scalars["String"]>;
};

export type QueryEmailTemplateListArgs = {
  updatedByID?: Maybe<Scalars["ID"]>;
  isActive?: Maybe<Scalars["Boolean"]>;
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryEmailTemplateByIdArgs = {
  id: Scalars["ID"];
};

export type QueryEmailTemplateImageListArgs = {
  search?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryAddBulkCalendarEventsArgs = {
  groupSessionInstanceID: Scalars["ID"];
};

export type QueryGroupSessionInstanceListByIdArgs = {
  groupSessionInstanceIDList: Array<Maybe<Scalars["ID"]>>;
};

export type QueryResendMemberInviteArgs = {
  userID: Scalars["ID"];
};

export type QueryActiveMemberListArgs = {
  companyID: Scalars["ID"];
};

export type QueryCustomerIoSpikeArgs = {
  userID: Scalars["ID"];
};

export type QueryVitalGetProvidersArgs = {
  platform: Scalars["String"];
};

export type QueryVitalGetLinkOauthProviderArgs = {
  providerId: Scalars["String"];
};

export type QueryVitalGetLinkPasswordProviderArgs = {
  providerId: Scalars["String"];
  username: Scalars["String"];
  password: Scalars["String"];
};

export type QueryVitalGetLinkEmailProviderArgs = {
  providerId: Scalars["String"];
};

export type QueryLearnerArgs = {
  appInfo: AppInfo;
};

export type QueryLearnerSessionArgs = {
  id: Scalars["ID"];
  appInfo: AppInfo;
};

export type QueryLearnerPractitionerArgs = {
  id: Scalars["ID"];
  appInfo: AppInfo;
};

export type QueryLearnerRecordingArgs = {
  id: Scalars["ID"];
  appInfo: AppInfo;
};

export type QueryLearnerArticleArgs = {
  id: Scalars["ID"];
  appInfo: AppInfo;
};

export type QueryLearnerBeforeGroupSessionFeedbackFormArgs = {
  groupSessionId: Scalars["ID"];
  appInfo: AppInfo;
};

export type QueryLearnerAfterGroupSessionFeedbackFormArgs = {
  groupSessionId: Scalars["ID"];
  appInfo: AppInfo;
};

export type QueryLearnerContentListArgs = {
  id: Scalars["ID"];
  searchQuery: Scalars["String"];
  filters: LearnerContentListFilters;
  appInfo: AppInfo;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryLearnerScreenSessionsArgs = {
  appInfo: AppInfo;
};

export type QueryLearnerBiometricsDeviceConnectionArgs = {
  appInfo: AppInfo;
};

export type QueryVerifyCompanyTokenArgs = {
  appInfo: AppInfo;
  companyToken: Scalars["String"];
};

export type QuestionCreateInput = {
  order: Scalars["Int"];
  statement: Scalars["String"];
};

export type QuestionType = {
  __typename?: "QuestionType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  order: Scalars["Int"];
  statement: Scalars["String"];
};

export type QuestionUpdateInput = {
  order?: Maybe<Scalars["Int"]>;
  statement?: Maybe<Scalars["String"]>;
};

export type RangeInput = {
  __typename?: "RangeInput";
  id: Scalars["String"];
  label: Scalars["String"];
  required: Scalars["Boolean"];
  min: Scalars["Int"];
  minLabel: Scalars["String"];
  mid: Scalars["Int"];
  max: Scalars["Int"];
  maxLabel: Scalars["String"];
  step: Scalars["Int"];
  value?: Maybe<Scalars["String"]>;
};

export type RecommendationsType = {
  __typename?: "RecommendationsType";
  articles?: Maybe<Array<Maybe<ArticleType>>>;
  sessions?: Maybe<Array<Maybe<GroupSessionInstanceType>>>;
  recordings?: Maybe<Array<Maybe<GroupSessionInstanceType>>>;
};

export type RecommendationsTypeArticlesArgs = {
  limit?: Maybe<Scalars["Int"]>;
  order?: Maybe<Scalars["String"]>;
};

export type RecommendationsTypeSessionsArgs = {
  limit?: Maybe<Scalars["Int"]>;
  order?: Maybe<Scalars["String"]>;
};

export type RecommendationsTypeRecordingsArgs = {
  limit?: Maybe<Scalars["Int"]>;
  order?: Maybe<Scalars["String"]>;
};

export type RecordingsAndArticlesType = {
  __typename?: "RecordingsAndArticlesType";
  recordings?: Maybe<Array<Maybe<GroupSessionInstanceType>>>;
  articles?: Maybe<Array<Maybe<ArticleType>>>;
};

export type Refresh = {
  __typename?: "Refresh";
  payload: Scalars["GenericScalar"];
  refreshExpiresIn: Scalars["Int"];
  token: Scalars["String"];
};

export type RegisterForGroupSession = {
  __typename?: "RegisterForGroupSession";
  ok?: Maybe<Scalars["Boolean"]>;
  mailSent?: Maybe<Scalars["Boolean"]>;
  eventCreated?: Maybe<Scalars["Boolean"]>;
  groupSessionPersonJoined?: Maybe<GroupSessionPeopleJoiningType>;
};

export type RegisterForGroupSessionInput = {
  groupSessionID: Scalars["ID"];
  groupSessionInstanceID: Scalars["ID"];
  userTimezone?: Maybe<Scalars["String"]>;
  sessionRegistrationPlatform?: Maybe<Scalars["String"]>;
};

export type ReportArticleOpen = {
  __typename?: "ReportArticleOpen";
  ok?: Maybe<Scalars["Boolean"]>;
  groupUuid?: Maybe<Scalars["String"]>;
};

export type ReportArticleScrollEnd = {
  __typename?: "ReportArticleScrollEnd";
  ok?: Maybe<Scalars["Boolean"]>;
};

export type ReportArticleScrollProgress = {
  __typename?: "ReportArticleScrollProgress";
  ok?: Maybe<Scalars["Boolean"]>;
};

export type ReportArticleScrollStart = {
  __typename?: "ReportArticleScrollStart";
  ok?: Maybe<Scalars["Boolean"]>;
};

export type ReportGroupSessionLeft = {
  __typename?: "ReportGroupSessionLeft";
  ok?: Maybe<Scalars["Boolean"]>;
  eventCreated?: Maybe<Scalars["Boolean"]>;
};

export type ReportGroupSessionPing = {
  __typename?: "ReportGroupSessionPing";
  ok?: Maybe<Scalars["Boolean"]>;
  eventCreated?: Maybe<Scalars["Boolean"]>;
};

export type ReportRecordingOpen = {
  __typename?: "ReportRecordingOpen";
  ok?: Maybe<Scalars["Boolean"]>;
  groupUuid?: Maybe<Scalars["String"]>;
};

export type ReportRecordingVideoEnd = {
  __typename?: "ReportRecordingVideoEnd";
  ok?: Maybe<Scalars["Boolean"]>;
};

export type ReportRecordingVideoProgress = {
  __typename?: "ReportRecordingVideoProgress";
  ok?: Maybe<Scalars["Boolean"]>;
};

export type ReportRecordingVideoStart = {
  __typename?: "ReportRecordingVideoStart";
  ok?: Maybe<Scalars["Boolean"]>;
};

export type RequestSignInWithMagicLink = {
  __typename?: "RequestSignInWithMagicLink";
  ok: Scalars["Boolean"];
  message: Scalars["String"];
};

export type ResetPassword = {
  __typename?: "ResetPassword";
  sentMail?: Maybe<Scalars["Boolean"]>;
  ok?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<UserType>;
};

export type ResetPasswordInput = {
  email: Scalars["String"];
};

export type ResetPasswordWithLink = {
  __typename?: "ResetPasswordWithLink";
  ok?: Maybe<Scalars["Boolean"]>;
  message?: Maybe<Scalars["String"]>;
};

export type RoleType = {
  __typename?: "RoleType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  name: Scalars["String"];
  userdetailSet: Array<UserDetailType>;
};

export type SelectInput = {
  __typename?: "SelectInput";
  id: Scalars["String"];
  label: Scalars["String"];
  required: Scalars["Boolean"];
  options: Array<SelectInputOption>;
};

export type SelectInputOption = {
  __typename?: "SelectInputOption";
  label: Scalars["String"];
  value: Scalars["String"];
  imageUrl?: Maybe<Scalars["String"]>;
  selected?: Maybe<Scalars["Boolean"]>;
};

export type SelfServeAddMembers = {
  __typename?: "SelfServeAddMembers";
  ok?: Maybe<Scalars["Boolean"]>;
  duplicateMembers?: Maybe<Array<Maybe<Scalars["String"]>>>;
  numberOfSeatsAdded?: Maybe<Scalars["Int"]>;
  seatsLeft?: Maybe<Scalars["Int"]>;
  addedMembers?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type SelfServeAddSeats = {
  __typename?: "SelfServeAddSeats";
  ok?: Maybe<Scalars["Boolean"]>;
  company?: Maybe<CorporateCompanyType>;
  seatsAdded?: Maybe<Scalars["Int"]>;
};

export type SelfServeRemoveSeats = {
  __typename?: "SelfServeRemoveSeats";
  ok?: Maybe<Scalars["Boolean"]>;
  company?: Maybe<CorporateCompanyType>;
  seatsRemoved?: Maybe<Scalars["Int"]>;
};

export type SelfServeSignIn = {
  __typename?: "SelfServeSignIn";
  ok?: Maybe<Scalars["Boolean"]>;
  authToken?: Maybe<Scalars["String"]>;
  user?: Maybe<UserType>;
  paymentLink?: Maybe<Scalars["String"]>;
  isFirstSignIn?: Maybe<Scalars["Boolean"]>;
};

export type SelfServeSignUp = {
  __typename?: "SelfServeSignUp";
  ok?: Maybe<Scalars["Boolean"]>;
  paymentLink?: Maybe<Scalars["String"]>;
  authToken?: Maybe<Scalars["String"]>;
  user?: Maybe<UserType>;
};

export type SelfServeSignUpInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  password?: Maybe<Scalars["String"]>;
  jobTitle: Scalars["String"];
  userTimezone: Scalars["String"];
  currency: Scalars["String"];
  companyName: Scalars["String"];
  addressLine1: Scalars["String"];
  addressLine2?: Maybe<Scalars["String"]>;
  city: Scalars["String"];
  country: Scalars["String"];
  postCode: Scalars["String"];
  companyDomain?: Maybe<Scalars["String"]>;
  noOfSeats: Scalars["Int"];
  billingCycle?: Maybe<Scalars["String"]>;
};

export type SendCalendarInvites = {
  __typename?: "SendCalendarInvites";
  ok?: Maybe<Scalars["Boolean"]>;
  totalCount?: Maybe<Scalars["Int"]>;
  sessionCalendarInviteObjectList?: Maybe<
    Array<Maybe<SessionCalendarInviteType>>
  >;
};

export type SendCalendarInvitesInput = {
  groupSessionId?: Maybe<Scalars["ID"]>;
  groupSessionInstanceId?: Maybe<Scalars["ID"]>;
};

export type SendWebMail = {
  __typename?: "SendWebMail";
  mailSent?: Maybe<Scalars["Boolean"]>;
  sentTo?: Maybe<Scalars["String"]>;
  sentFrom?: Maybe<Scalars["String"]>;
};

export type SendWebMailInput = {
  title: Scalars["String"];
  email: Scalars["String"];
  toEmail?: Maybe<Array<Maybe<Scalars["String"]>>>;
  fullName?: Maybe<Scalars["String"]>;
  companyName?: Maybe<Scalars["String"]>;
  specialisation?: Maybe<Scalars["String"]>;
  jobTitle?: Maybe<Scalars["String"]>;
  noOfEmployees?: Maybe<Scalars["String"]>;
  message?: Maybe<Scalars["String"]>;
};

export type SentMailType = {
  __typename?: "SentMailType";
  sentMail?: Maybe<Scalars["Boolean"]>;
};

export type SentMailType1 = {
  __typename?: "SentMailType1";
  sentTo?: Maybe<Scalars["String"]>;
  sentMail?: Maybe<Scalars["Boolean"]>;
};

export type ServiceCreateInput = {
  name: Scalars["String"];
  photo?: Maybe<Scalars["String"]>;
  showOnApp?: Maybe<Scalars["Boolean"]>;
};

export type ServicePaginatedType = {
  __typename?: "ServicePaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<ServiceType>>>;
};

export type ServiceType = {
  __typename?: "ServiceType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  name: Scalars["String"];
  photo?: Maybe<Scalars["String"]>;
  barChartColor: Scalars["String"];
  showOnApp: Scalars["Boolean"];
  worksWithBiometrics: Scalars["Boolean"];
  classSet: Array<ClassModelType>;
  groupsessionSet: Array<GroupSessionType>;
  classCount?: Maybe<Scalars["Int"]>;
};

export type ServiceType1 = {
  __typename?: "ServiceType1";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  name: Scalars["String"];
  photo?: Maybe<Scalars["String"]>;
  barChartColor: Scalars["String"];
  showOnApp: Scalars["Boolean"];
  worksWithBiometrics: Scalars["Boolean"];
  classSet: Array<ClassModelType>;
  groupsessionSet: Array<GroupSessionType>;
  classCount?: Maybe<Scalars["Int"]>;
};

export type ServiceUpdateInput = {
  name?: Maybe<Scalars["String"]>;
  photo?: Maybe<Scalars["String"]>;
  showOnApp?: Maybe<Scalars["Boolean"]>;
};

export enum SessionCalendarInviteInviteStatus {
  Pending = "PENDING",
  Sent = "SENT",
  ToUpdate = "TO_UPDATE",
  Updated = "UPDATED",
  ToDelete = "TO_DELETE",
  Deleted = "DELETED",
  Cancelled = "CANCELLED",
  Error = "ERROR",
}

export type SessionCalendarInviteType = {
  __typename?: "SessionCalendarInviteType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  user: UserType;
  groupSessionInstance?: Maybe<GroupSessionInstanceType>;
  privateSession?: Maybe<ClassSessionType>;
  eventId?: Maybe<Scalars["String"]>;
  sessionUserLink: Scalars["String"];
  responseStatus?: Maybe<Scalars["String"]>;
  inviteStatus: SessionCalendarInviteInviteStatus;
  roleName?: Maybe<Scalars["String"]>;
  otherDetails?: Maybe<Scalars["String"]>;
};

export enum SessionFeedbackFeedbackType {
  Live = "LIVE",
  Recording = "RECORDING",
  Private = "PRIVATE",
}

export type SessionFeedbackType = {
  __typename?: "SessionFeedbackType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  session?: Maybe<ClassSessionType>;
  privateSession?: Maybe<ClassSessionType>;
  groupSessionInstance?: Maybe<GroupSessionInstanceType>;
  user?: Maybe<UserType>;
  feedbackType: SessionFeedbackFeedbackType;
  moodBefore?: Maybe<Scalars["Int"]>;
  moodAfter?: Maybe<Scalars["Int"]>;
  classRating?: Maybe<ClassRatingType>;
  teacherCharacteristics: Array<FeedbackCharacteristicType>;
  notes?: Maybe<Scalars["String"]>;
};

export type SessionHistoryProfileType = {
  __typename?: "SessionHistoryProfileType";
  count?: Maybe<Scalars["Int"]>;
  serviceID?: Maybe<Scalars["ID"]>;
  serviceName?: Maybe<Scalars["String"]>;
  serviceQs?: Maybe<Array<Maybe<SessionUnionType>>>;
};

export type SessionUnionType = ClassSessionType | GroupSessionInstanceType;

export type SessionsPerMonth = {
  __typename?: "SessionsPerMonth";
  labels?: Maybe<Array<Maybe<Scalars["String"]>>>;
  data?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  backgroundColor?: Maybe<Array<Maybe<Scalars["String"]>>>;
  borderColor?: Maybe<Array<Maybe<Scalars["String"]>>>;
  services?: Maybe<Array<Maybe<ServiceType>>>;
};

export type SignIn = {
  __typename?: "SignIn";
  ok?: Maybe<Scalars["Boolean"]>;
  authToken?: Maybe<Scalars["String"]>;
  user?: Maybe<UserType>;
  learner?: Maybe<Learner>;
  roles: Array<Maybe<Scalars["String"]>>;
};

export type SignInInput = {
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type SignOut = {
  __typename?: "SignOut";
  ok?: Maybe<Scalars["Boolean"]>;
};

export type SingleInputScreen = {
  __typename?: "SingleInputScreen";
  id: Scalars["String"];
  titleHtml: Scalars["String"];
  subtitleHtml?: Maybe<Scalars["String"]>;
  input: Input;
  buttonText?: Maybe<Scalars["String"]>;
  skipButtonText: Scalars["String"];
  logoutButtonText?: Maybe<Scalars["String"]>;
};

export type StatusType = {
  __typename?: "StatusType";
  status?: Maybe<Scalars["Boolean"]>;
};

export type StopRecording = {
  __typename?: "StopRecording";
  ok?: Maybe<Scalars["Boolean"]>;
  agoraDetail?: Maybe<AgoraDetailType>;
};

export type StopRecordingInput = {
  sessionID?: Maybe<Scalars["ID"]>;
};

export type StudentDetailCreateInput = {
  email: Scalars["String"];
  password?: Maybe<Scalars["String"]>;
  roles: Array<Maybe<Scalars["ID"]>>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  locationID?: Maybe<Scalars["ID"]>;
  credits?: Maybe<Scalars["Int"]>;
  addressList?: Maybe<Array<Maybe<AddressInput>>>;
  phone?: Maybe<Scalars["String"]>;
  plans?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  wellbeingHours?: Maybe<Scalars["Int"]>;
  gender?: Maybe<Scalars["String"]>;
  dob?: Maybe<Scalars["Date"]>;
  companyID?: Maybe<Scalars["ID"]>;
  isLondon?: Maybe<Scalars["Boolean"]>;
  photo?: Maybe<Scalars["String"]>;
  injuries?: Maybe<Scalars["String"]>;
  timezone?: Maybe<Scalars["String"]>;
  pillarName?: Maybe<Scalars["String"]>;
  permissionToSendCalendarInvites?: Maybe<Scalars["Boolean"]>;
};

export type StudentDetailPaginatedType = {
  __typename?: "StudentDetailPaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<StudentDetailType>>>;
};

export type StudentDetailType = {
  __typename?: "StudentDetailType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  userdetailObj: UserDetailType;
  availableCredits: Scalars["Int"];
  location?: Maybe<LocationType>;
  phone?: Maybe<Scalars["String"]>;
  wellbeingHours?: Maybe<Scalars["Int"]>;
  gender?: Maybe<Scalars["String"]>;
  dob?: Maybe<Scalars["Date"]>;
  company?: Maybe<CorporateCompanyType>;
  isLondon: Scalars["Boolean"];
  plans: Array<PlanType>;
  isSubscribed: Scalars["Boolean"];
  subscriptionExipiryDate?: Maybe<Scalars["Date"]>;
  injuries?: Maybe<Scalars["String"]>;
  companyLocation?: Maybe<CompanyLocationType>;
  assessmentTaken: Scalars["Boolean"];
  shouldRetakeAssessment: Scalars["Boolean"];
  isWaitingForAssessmentResults: Scalars["Boolean"];
  waitingForAssessmentResultsStartedAt?: Maybe<Scalars["DateTime"]>;
  jobTitle?: Maybe<Scalars["String"]>;
  permissionToSendCalendarInvites?: Maybe<Scalars["Boolean"]>;
  pillar?: Maybe<PillarType>;
  onboarding?: Maybe<OnboardingType>;
  corporatecompanyadminSet: Array<CorporateCompanyAdminType>;
  paymentSet: Array<PaymentType>;
  externalassessmentSet: Array<ExternalAssessmentType>;
  classsessionSet: Array<ClassSessionType>;
  invitationSet: Array<InvitationType>;
  teacherfeedbackbystudentSet: Array<TeacherFeedbackByStudentType>;
  moodSet: Array<MoodType>;
};

export type StudentDetailUpdateInput = {
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  roles?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  locationID?: Maybe<Scalars["ID"]>;
  credits?: Maybe<Scalars["Int"]>;
  addressList?: Maybe<Array<Maybe<AddressInput>>>;
  phone?: Maybe<Scalars["String"]>;
  plans?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  wellbeingHours?: Maybe<Scalars["Int"]>;
  gender?: Maybe<Scalars["String"]>;
  dob?: Maybe<Scalars["Date"]>;
  companyID?: Maybe<Scalars["ID"]>;
  isLondon?: Maybe<Scalars["Boolean"]>;
  photo?: Maybe<Scalars["String"]>;
  isSubscribed?: Maybe<Scalars["Boolean"]>;
  subscriptionExipiryDate?: Maybe<Scalars["Date"]>;
  injuries?: Maybe<Scalars["String"]>;
  timezone?: Maybe<Scalars["String"]>;
  companyLocationID?: Maybe<Scalars["ID"]>;
  assessmentTaken?: Maybe<Scalars["Boolean"]>;
  shouldRetakeAssessment?: Maybe<Scalars["Boolean"]>;
};

export type StudentFeedbackByTeacherPaginatedType = {
  __typename?: "StudentFeedbackByTeacherPaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<StudentFeedbackByTeacherType>>>;
};

export type StudentFeedbackByTeacherType = {
  __typename?: "StudentFeedbackByTeacherType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  teacher?: Maybe<TeacherDetailType>;
  session?: Maybe<ClassSessionType>;
  groupSessionInstance?: Maybe<GroupSessionInstanceType>;
  about?: Maybe<UserType>;
  title: Scalars["String"];
  notes: Scalars["String"];
};

export type StudentProfileType = {
  __typename?: "StudentProfileType";
  moodProgressData?: Maybe<Array<Maybe<SessionFeedbackType>>>;
  achievements?: Maybe<AchievementsType>;
  studentData?: Maybe<StudentDetailType>;
  historyTotalCount?: Maybe<Scalars["Int"]>;
  history?: Maybe<Array<Maybe<SessionHistoryProfileType>>>;
  myFeedback?: Maybe<Array<Maybe<TeacherSessionNotesType>>>;
  externalAssessmentUrl?: Maybe<Scalars["String"]>;
  externalAssessment?: Maybe<ExternalAssessmentType>;
  externalAssessmentWebAppDisplayText?: Maybe<Scalars["String"]>;
  externalAssessmentDisplayText?: Maybe<Scalars["String"]>;
  externalAssessmentDisplayButtonText?: Maybe<Scalars["String"]>;
  externalAssessmentWaitingVideoTitle?: Maybe<Scalars["String"]>;
  externalAssessmentWaitingVideoClip?: Maybe<Scalars["String"]>;
  retakeAssessmentDisplayButtonText?: Maybe<Scalars["String"]>;
  /** @deprecated use retake_assessment_reminder instead */
  retakeAssessment?: Maybe<Scalars["Boolean"]>;
  retakeAssessmentReminder?: Maybe<Scalars["Boolean"]>;
  retakeAssessmentReminderDisplayButtonText?: Maybe<Scalars["String"]>;
  pillarRecommendations?: Maybe<PillarRecommendationsType>;
  isWaitingForAssessmentResults?: Maybe<Scalars["Boolean"]>;
};

export type TeacherAvailabilityListType = {
  __typename?: "TeacherAvailabilityListType";
  teacherObj?: Maybe<TeacherDetailType>;
  date?: Maybe<Scalars["Date"]>;
  fromTime?: Maybe<Scalars["Time"]>;
  toTime?: Maybe<Scalars["Time"]>;
  minCredits?: Maybe<Scalars["Int"]>;
  maxCredits?: Maybe<Scalars["Int"]>;
};

export type TeacherAvailabilityListWithClassesType = {
  __typename?: "TeacherAvailabilityListWithClassesType";
  teacherAvailabilityList?: Maybe<Array<Maybe<TeacherAvailabilityListType>>>;
  classesForDuration?: Maybe<Array<Maybe<PricingSystemType>>>;
};

export type TeacherBankDetailCreateInput = {
  teacherdetailObj: Scalars["ID"];
  accountHolderName: Scalars["String"];
  accountCountry: Scalars["String"];
  accountNo: Scalars["String"];
  sortCode?: Maybe<Scalars["String"]>;
  IBAN?: Maybe<Scalars["String"]>;
  bicSwift?: Maybe<Scalars["String"]>;
  billingAddress?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  postCode?: Maybe<Scalars["String"]>;
};

export type TeacherBankDetailType = {
  __typename?: "TeacherBankDetailType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  teacherdetailObj: TeacherDetailType;
  accountHolderName: Scalars["String"];
  accountCountry: Scalars["String"];
  accountNo: Scalars["String"];
  sortCode?: Maybe<Scalars["String"]>;
  iban?: Maybe<Scalars["String"]>;
  bicSwift?: Maybe<Scalars["String"]>;
  billingAddress?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  postCode?: Maybe<Scalars["String"]>;
};

export type TeacherBankDetailUpdateInput = {
  accountHolderName?: Maybe<Scalars["String"]>;
  accountCountry?: Maybe<Scalars["String"]>;
  accountNo?: Maybe<Scalars["String"]>;
  sortCode?: Maybe<Scalars["String"]>;
  IBAN?: Maybe<Scalars["String"]>;
  bicSwift?: Maybe<Scalars["String"]>;
  billingAddress?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  postCode?: Maybe<Scalars["String"]>;
};

export type TeacherCalendarCreateInput = {
  teacherdetailObj: Scalars["ID"];
  availableDay: Scalars["String"];
  fromTime: Scalars["Time"];
  toTime: Scalars["Time"];
  classType?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type TeacherCalendarDayOffUpdateInput = {
  dayOffName?: Maybe<Scalars["String"]>;
  daysOffFrom?: Maybe<Scalars["Date"]>;
  daysOffTo?: Maybe<Scalars["Date"]>;
};

export type TeacherCalendarDaysOffCreateInput = {
  teacherdetailObj: Scalars["ID"];
  dayOffName?: Maybe<Scalars["String"]>;
  daysOffFrom: Scalars["Date"];
  daysOffTo: Scalars["Date"];
};

export type TeacherCalendarDaysOffType = {
  __typename?: "TeacherCalendarDaysOffType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  teacherdetailObj: TeacherDetailType;
  dayOffName?: Maybe<Scalars["String"]>;
  daysOffFrom: Scalars["Date"];
  daysOffTo: Scalars["Date"];
};

export type TeacherCalendarEachCdInput = {
  availableDay?: Maybe<Scalars["String"]>;
  fromTime?: Maybe<Scalars["Time"]>;
  toTime?: Maybe<Scalars["Time"]>;
  classType?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type TeacherCalendarListCdInput = {
  teacherdetailID?: Maybe<Scalars["ID"]>;
  calendarList?: Maybe<Array<Maybe<TeacherCalendarEachCdInput>>>;
};

export type TeacherCalendarType = {
  __typename?: "TeacherCalendarType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  teacherdetailObj: TeacherDetailType;
  availableDay: Scalars["String"];
  fromTime?: Maybe<Scalars["String"]>;
  toTime?: Maybe<Scalars["String"]>;
  classType: Array<ClassTypeType>;
};

export type TeacherCalendarUpdateInput = {
  availableDay?: Maybe<Scalars["String"]>;
  fromTime?: Maybe<Scalars["Time"]>;
  toTime?: Maybe<Scalars["Time"]>;
  classType?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type TeacherClassModelType = {
  __typename?: "TeacherClassModelType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  photo?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  description: Scalars["String"];
  service: ServiceType;
  plans: Array<PlanType>;
  preparationMaterials: Scalars["String"];
  showOnApp: Scalars["Boolean"];
  teacherdetailSet: Array<TeacherDetailType>;
  pricingsystemSet: Array<PricingSystemType>;
  promocodeSet: Array<PromoCodeType>;
  groupsessionSet: Array<GroupSessionType>;
  classsessionSet: Array<ClassSessionType>;
  minCredits?: Maybe<Scalars["Int"]>;
  maxCredits?: Maybe<Scalars["Int"]>;
};

export type TeacherDataType = {
  __typename?: "TeacherDataType";
  teacherObj?: Maybe<TeacherDetailType>;
  teacherMinCredits?: Maybe<Scalars["Int"]>;
  teacherMaxCredits?: Maybe<Scalars["Int"]>;
};

export type TeacherDetailCreateInput = {
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  photo?: Maybe<Scalars["String"]>;
  addressList: Array<Maybe<AddressInput>>;
  phone: Scalars["String"];
  bio: Scalars["String"];
  locationID?: Maybe<Scalars["ID"]>;
  teachingAccreditations: Scalars["String"];
  levelID: Scalars["ID"];
  roles: Array<Maybe<Scalars["ID"]>>;
  classList?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  introVideo?: Maybe<Scalars["String"]>;
  introVideoThumbnail?: Maybe<Scalars["String"]>;
  timezone?: Maybe<Scalars["String"]>;
  landscapePhoto?: Maybe<Scalars["String"]>;
  permissionToSendCalendarInvites?: Maybe<Scalars["Boolean"]>;
};

export type TeacherDetailPageType = {
  __typename?: "TeacherDetailPageType";
  teacher?: Maybe<TeacherDetailType>;
  classes?: Maybe<Array<Maybe<TeacherClassModelType>>>;
  recordedSessions?: Maybe<Array<Maybe<TeacherGroupSessionInstanceType>>>;
};

export type TeacherDetailPaginatedType = {
  __typename?: "TeacherDetailPaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<TeacherDetailType>>>;
};

export type TeacherDetailType = {
  __typename?: "TeacherDetailType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  userdetailObj: UserDetailType;
  phone?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  location?: Maybe<LocationType>;
  teachingAccreditations?: Maybe<Scalars["String"]>;
  level?: Maybe<TeacherLevelType>;
  classes: Array<ClassModelType>;
  introVideo?: Maybe<Scalars["String"]>;
  introVideoThumbnail?: Maybe<Scalars["String"]>;
  landscapePhoto?: Maybe<Scalars["String"]>;
  recentSession?: Maybe<GroupSessionInstanceType>;
  teacherbankdetail?: Maybe<TeacherBankDetailType>;
  teachercalendarSet: Array<TeacherCalendarType>;
  teachercalendardaysoffSet: Array<TeacherCalendarDaysOffType>;
  groupsessioninstanceSet: Array<GroupSessionInstanceType>;
  classsessionSet: Array<ClassSessionType>;
  studentfeedbackbyteacherSet: Array<StudentFeedbackByTeacherType>;
  teacherfeedbackbystudentSet: Array<TeacherFeedbackByStudentType>;
  userfavouritesSet: Array<UserFavouritesType>;
  teacherGroupSessions?: Maybe<Array<Maybe<TeacherGroupSessionInstanceType>>>;
};

export type TeacherDetailUpdateInput = {
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  photo?: Maybe<Scalars["String"]>;
  addressList?: Maybe<Array<Maybe<AddressInput>>>;
  phone?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  locationID?: Maybe<Scalars["ID"]>;
  teachingAccreditations?: Maybe<Scalars["String"]>;
  levelID?: Maybe<Scalars["ID"]>;
  roles?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  classList?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  introVideo?: Maybe<Scalars["String"]>;
  introVideoThumbnail?: Maybe<Scalars["String"]>;
  timezone?: Maybe<Scalars["String"]>;
  landscapePhoto?: Maybe<Scalars["String"]>;
};

export type TeacherFeedbackByStudentDetailType = {
  __typename?: "TeacherFeedbackByStudentDetailType";
  aboveExpectation?: Maybe<Scalars["Int"]>;
  metExpectation?: Maybe<Scalars["Int"]>;
  belowExpectation?: Maybe<Scalars["Int"]>;
  friendly?: Maybe<Scalars["Int"]>;
  energetic?: Maybe<Scalars["Int"]>;
  calm?: Maybe<Scalars["Int"]>;
  meticulous?: Maybe<Scalars["Int"]>;
  confident?: Maybe<Scalars["Int"]>;
  strict?: Maybe<Scalars["Int"]>;
  experienced?: Maybe<Scalars["Int"]>;
  notes?: Maybe<Array<Maybe<TeacherFeedbackByStudentType>>>;
};

export type TeacherFeedbackByStudentType = {
  __typename?: "TeacherFeedbackByStudentType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  student?: Maybe<StudentDetailType>;
  session: ClassSessionType;
  about?: Maybe<TeacherDetailType>;
  classRating?: Maybe<ClassRatingType>;
  characteristics: Array<FeedbackCharacteristicType>;
  notes: Scalars["String"];
};

export type TeacherGroupSessionInstanceType = {
  __typename?: "TeacherGroupSessionInstanceType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  groupSession: GroupSessionType;
  scheduledDate: Scalars["Date"];
  instanceStartDateTime?: Maybe<Scalars["DateTime"]>;
  instanceEndDateTime?: Maybe<Scalars["DateTime"]>;
  instanceDisplayEndDateTime?: Maybe<Scalars["DateTime"]>;
  sessionDurationMinutes: Scalars["Int"];
  teacher?: Maybe<TeacherDetailType>;
  recordingUrlThumbnail?: Maybe<Scalars["String"]>;
  recordingUrl?: Maybe<Scalars["String"]>;
  recordingDuration?: Maybe<Scalars["Float"]>;
  agoraDetails?: Maybe<AgoraDetailType>;
  showOnClassPage: Scalars["Boolean"];
  showOnTeacherPage: Scalars["Boolean"];
  showOnCommunityPage: Scalars["Boolean"];
  joiningLink?: Maybe<Scalars["String"]>;
  teacherReminderEmail?: Maybe<Scalars["DateTime"]>;
  teacherdetail?: Maybe<TeacherDetailType>;
  groupsessionpeoplejoiningSet: Array<GroupSessionPeopleJoiningType>;
  studentfeedbackbyteacherSet: Array<StudentFeedbackByTeacherType>;
  sessionfeedbackSet: Array<SessionFeedbackType>;
  teachersessionnote?: Maybe<TeacherSessionNotesType>;
  userfavouritesSet: Array<UserFavouritesType>;
  sessioncalendarinviteSet: Array<SessionCalendarInviteType>;
  recordingDurationText?: Maybe<Scalars["String"]>;
};

export type TeacherLevelType = {
  __typename?: "TeacherLevelType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  level: Scalars["String"];
  teacherdetailSet: Array<TeacherDetailType>;
  pricingsystemSet: Array<PricingSystemType>;
};

export type TeacherSessionNotesType = {
  __typename?: "TeacherSessionNotesType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  privateSession?: Maybe<ClassSessionType>;
  groupSessionInstance?: Maybe<GroupSessionInstanceType>;
  title?: Maybe<Scalars["String"]>;
  notes?: Maybe<Scalars["String"]>;
};

export type TeacherSessionNotesTypePaginatedType = {
  __typename?: "TeacherSessionNotesTypePaginatedType";
  page?: Maybe<Scalars["Int"]>;
  pages?: Maybe<Scalars["Int"]>;
  totalRecord?: Maybe<Scalars["Int"]>;
  hasNext?: Maybe<Scalars["Boolean"]>;
  hasPrev?: Maybe<Scalars["Boolean"]>;
  objects?: Maybe<Array<Maybe<TeacherSessionNotesType>>>;
};

export type TextInput = {
  __typename?: "TextInput";
  id: Scalars["String"];
  label: Scalars["String"];
  required: Scalars["Boolean"];
  minLength: Scalars["Int"];
  maxLength: Scalars["Int"];
  placeholder?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export type TriggerLearnerVerificationEmail = {
  __typename?: "TriggerLearnerVerificationEmail";
  response?: Maybe<VerifyToken>;
};

export type UnRegisterForGroupSession = {
  __typename?: "UnRegisterForGroupSession";
  ok?: Maybe<Scalars["Boolean"]>;
  sentMail?: Maybe<Scalars["Boolean"]>;
  eventCreated?: Maybe<Scalars["Boolean"]>;
  groupSessionPersonLeft?: Maybe<GroupSessionPeopleJoiningType>;
};

export type UpcomingGroupSessionType = {
  __typename?: "UpcomingGroupSessionType";
  upcomingGroupSessions?: Maybe<Array<Maybe<GroupSessionInstanceType>>>;
  filters?: Maybe<FiltersType>;
};

export type UpdateAddress = {
  __typename?: "UpdateAddress";
  ok?: Maybe<Scalars["Boolean"]>;
  address?: Maybe<AddressType>;
};

export type UpdateArticle = {
  __typename?: "UpdateArticle";
  ok?: Maybe<Scalars["Boolean"]>;
  article?: Maybe<ArticleType>;
};

export type UpdateCategory = {
  __typename?: "UpdateCategory";
  ok?: Maybe<Scalars["Boolean"]>;
  category?: Maybe<CategoryType>;
};

export type UpdateClass = {
  __typename?: "UpdateClass";
  ok?: Maybe<Scalars["Boolean"]>;
  classModel?: Maybe<ClassModelType>;
};

export type UpdateClassSession = {
  __typename?: "UpdateClassSession";
  ok?: Maybe<Scalars["Boolean"]>;
  studentMailSent?: Maybe<Scalars["Boolean"]>;
  teacherMailSent?: Maybe<Scalars["Boolean"]>;
  classSession?: Maybe<ClassSessionType>;
  zoomMtgNumber?: Maybe<Scalars["String"]>;
  zoomMtgPassWord?: Maybe<Scalars["String"]>;
  zoomMtgSignature?: Maybe<Scalars["String"]>;
};

export type UpdateClassType = {
  __typename?: "UpdateClassType";
  ok?: Maybe<Scalars["Boolean"]>;
  classtype?: Maybe<ClassTypeType>;
};

export type UpdateCompanyLocation = {
  __typename?: "UpdateCompanyLocation";
  ok?: Maybe<Scalars["Boolean"]>;
  companyLocation?: Maybe<CompanyLocationType>;
};

export type UpdateCorporateCompany = {
  __typename?: "UpdateCorporateCompany";
  ok?: Maybe<Scalars["Boolean"]>;
  corporateCompany?: Maybe<CorporateCompanyType>;
};

export type UpdateCorporateCompanyAdmin = {
  __typename?: "UpdateCorporateCompanyAdmin";
  ok?: Maybe<Scalars["Boolean"]>;
  corporateCompanyAdmin?: Maybe<CorporateCompanyAdminType>;
};

export type UpdateDuration = {
  __typename?: "UpdateDuration";
  ok?: Maybe<Scalars["Boolean"]>;
  duration?: Maybe<DurationType>;
};

export type UpdateEmailTemplate = {
  __typename?: "UpdateEmailTemplate";
  ok?: Maybe<Scalars["Boolean"]>;
  emailTemplate?: Maybe<EmailTemplateType>;
};

export type UpdateEventType = {
  __typename?: "UpdateEventType";
  checkingResponsesOfSessionCalendars?: Maybe<
    Array<Maybe<SessionCalendarInviteType>>
  >;
  totalCheckingCount?: Maybe<Scalars["Int"]>;
  message?: Maybe<Scalars["String"]>;
};

export type UpdateGroupSession = {
  __typename?: "UpdateGroupSession";
  ok?: Maybe<Scalars["Boolean"]>;
  groupSession?: Maybe<GroupSessionType>;
};

export type UpdateGroupSessionInstance = {
  __typename?: "UpdateGroupSessionInstance";
  ok?: Maybe<Scalars["Boolean"]>;
  groupSessionTeacherUpdatedList?: Maybe<
    Array<Maybe<GroupSessionInstanceType>>
  >;
};

export type UpdateLocation = {
  __typename?: "UpdateLocation";
  ok?: Maybe<Scalars["Boolean"]>;
  location?: Maybe<LocationType>;
};

export type UpdateMood = {
  __typename?: "UpdateMood";
  ok?: Maybe<Scalars["Boolean"]>;
  mood?: Maybe<MoodType>;
};

export type UpdateMoodInput = {
  after?: Maybe<Scalars["Int"]>;
};

export type UpdatePackage = {
  __typename?: "UpdatePackage";
  ok?: Maybe<Scalars["Boolean"]>;
  package?: Maybe<PackageType>;
};

export type UpdatePlan = {
  __typename?: "UpdatePlan";
  ok?: Maybe<Scalars["Boolean"]>;
  plan?: Maybe<PlanType>;
};

export type UpdatePricingSystem = {
  __typename?: "UpdatePricingSystem";
  ok?: Maybe<Scalars["Boolean"]>;
  pricingSystem?: Maybe<PricingSystemType>;
};

export type UpdatePromoCode = {
  __typename?: "UpdatePromoCode";
  ok?: Maybe<Scalars["Boolean"]>;
  promoCode?: Maybe<PromoCodeType>;
};

export type UpdateQuestion = {
  __typename?: "UpdateQuestion";
  ok?: Maybe<Scalars["Boolean"]>;
  question?: Maybe<QuestionType>;
};

export type UpdateRole = {
  __typename?: "UpdateRole";
  ok?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<RoleType>;
};

export type UpdateSentCalendarInvites = {
  __typename?: "UpdateSentCalendarInvites";
  ok?: Maybe<Scalars["Boolean"]>;
  updatedCalendarInviteList?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type UpdateService = {
  __typename?: "UpdateService";
  ok?: Maybe<Scalars["Boolean"]>;
  service?: Maybe<ServiceType>;
};

export type UpdateStudentDetail = {
  __typename?: "UpdateStudentDetail";
  ok?: Maybe<Scalars["Boolean"]>;
  mailSent?: Maybe<Scalars["Boolean"]>;
  studentDetail?: Maybe<StudentDetailType>;
};

export type UpdateStudentFeedbackByTeacher = {
  __typename?: "UpdateStudentFeedbackByTeacher";
  ok?: Maybe<Scalars["Boolean"]>;
  studentfeedbackbyteacher?: Maybe<StudentFeedbackByTeacherType>;
};

export type UpdateStudentFeedbackByTeacherInput = {
  title?: Maybe<Scalars["String"]>;
  notes?: Maybe<Scalars["String"]>;
};

export type UpdateTeacherBankDetail = {
  __typename?: "UpdateTeacherBankDetail";
  ok?: Maybe<Scalars["Boolean"]>;
  teacherbankDetail?: Maybe<TeacherBankDetailType>;
};

export type UpdateTeacherCalendar = {
  __typename?: "UpdateTeacherCalendar";
  ok?: Maybe<Scalars["Boolean"]>;
  teacherCalendar?: Maybe<TeacherCalendarType>;
};

export type UpdateTeacherCalendarDayOff = {
  __typename?: "UpdateTeacherCalendarDayOff";
  ok?: Maybe<Scalars["Boolean"]>;
  teacherCalendarDayOff?: Maybe<TeacherCalendarDaysOffType>;
};

export type UpdateTeacherDetail = {
  __typename?: "UpdateTeacherDetail";
  ok?: Maybe<Scalars["Boolean"]>;
  teacherDetail?: Maybe<TeacherDetailType>;
};

export type UpdateTeacherFeedbackByStudent = {
  __typename?: "UpdateTeacherFeedbackByStudent";
  ok?: Maybe<Scalars["Boolean"]>;
  teacherfeedbackbystudent?: Maybe<TeacherFeedbackByStudentType>;
};

export type UpdateTeacherFeedbackByStudentInput = {
  classRatingID?: Maybe<Scalars["ID"]>;
  characteristicIDList?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  notes?: Maybe<Scalars["String"]>;
};

export type UpdateTeacherLevel = {
  __typename?: "UpdateTeacherLevel";
  ok?: Maybe<Scalars["Boolean"]>;
  teacherLevel?: Maybe<TeacherLevelType>;
};

export type UpdateTimezone = {
  __typename?: "UpdateTimezone";
  ok?: Maybe<Scalars["Boolean"]>;
  userDetail?: Maybe<UserDetailType>;
};

export type UpdateUser = {
  __typename?: "UpdateUser";
  ok?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<UserType>;
};

export type UpdateUserDetail = {
  __typename?: "UpdateUserDetail";
  ok?: Maybe<Scalars["Boolean"]>;
  userDetail?: Maybe<UserDetailType>;
};

export type UrlType = {
  __typename?: "UrlType";
  url?: Maybe<Scalars["String"]>;
};

export type UserCreateInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  roles: Array<Maybe<Scalars["ID"]>>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
};

export type UserDetailCreateInput = {
  userObj: Scalars["ID"];
  roles: Array<Maybe<Scalars["ID"]>>;
  addressList?: Maybe<Array<Maybe<Scalars["JSONString"]>>>;
  photo?: Maybe<Scalars["String"]>;
  timezone?: Maybe<Scalars["String"]>;
};

export enum UserDetailTimezone {
  AfricaAbidjan = "AFRICA_ABIDJAN",
  AfricaAccra = "AFRICA_ACCRA",
  AfricaAddisAbaba = "AFRICA_ADDIS_ABABA",
  AfricaAlgiers = "AFRICA_ALGIERS",
  AfricaAsmara = "AFRICA_ASMARA",
  AfricaAsmera = "AFRICA_ASMERA",
  AfricaBamako = "AFRICA_BAMAKO",
  AfricaBangui = "AFRICA_BANGUI",
  AfricaBanjul = "AFRICA_BANJUL",
  AfricaBissau = "AFRICA_BISSAU",
  AfricaBlantyre = "AFRICA_BLANTYRE",
  AfricaBrazzaville = "AFRICA_BRAZZAVILLE",
  AfricaBujumbura = "AFRICA_BUJUMBURA",
  AfricaCairo = "AFRICA_CAIRO",
  AfricaCasablanca = "AFRICA_CASABLANCA",
  AfricaCeuta = "AFRICA_CEUTA",
  AfricaConakry = "AFRICA_CONAKRY",
  AfricaDakar = "AFRICA_DAKAR",
  AfricaDarEsSalaam = "AFRICA_DAR_ES_SALAAM",
  AfricaDjibouti = "AFRICA_DJIBOUTI",
  AfricaDouala = "AFRICA_DOUALA",
  AfricaElAaiun = "AFRICA_EL_AAIUN",
  AfricaFreetown = "AFRICA_FREETOWN",
  AfricaGaborone = "AFRICA_GABORONE",
  AfricaHarare = "AFRICA_HARARE",
  AfricaJohannesburg = "AFRICA_JOHANNESBURG",
  AfricaJuba = "AFRICA_JUBA",
  AfricaKampala = "AFRICA_KAMPALA",
  AfricaKhartoum = "AFRICA_KHARTOUM",
  AfricaKigali = "AFRICA_KIGALI",
  AfricaKinshasa = "AFRICA_KINSHASA",
  AfricaLagos = "AFRICA_LAGOS",
  AfricaLibreville = "AFRICA_LIBREVILLE",
  AfricaLome = "AFRICA_LOME",
  AfricaLuanda = "AFRICA_LUANDA",
  AfricaLubumbashi = "AFRICA_LUBUMBASHI",
  AfricaLusaka = "AFRICA_LUSAKA",
  AfricaMalabo = "AFRICA_MALABO",
  AfricaMaputo = "AFRICA_MAPUTO",
  AfricaMaseru = "AFRICA_MASERU",
  AfricaMbabane = "AFRICA_MBABANE",
  AfricaMogadishu = "AFRICA_MOGADISHU",
  AfricaMonrovia = "AFRICA_MONROVIA",
  AfricaNairobi = "AFRICA_NAIROBI",
  AfricaNdjamena = "AFRICA_NDJAMENA",
  AfricaNiamey = "AFRICA_NIAMEY",
  AfricaNouakchott = "AFRICA_NOUAKCHOTT",
  AfricaOuagadougou = "AFRICA_OUAGADOUGOU",
  AfricaPortoNovo = "AFRICA_PORTO_NOVO",
  AfricaSaoTome = "AFRICA_SAO_TOME",
  AfricaTimbuktu = "AFRICA_TIMBUKTU",
  AfricaTripoli = "AFRICA_TRIPOLI",
  AfricaTunis = "AFRICA_TUNIS",
  AfricaWindhoek = "AFRICA_WINDHOEK",
  AmericaAdak = "AMERICA_ADAK",
  AmericaAnchorage = "AMERICA_ANCHORAGE",
  AmericaAnguilla = "AMERICA_ANGUILLA",
  AmericaAntigua = "AMERICA_ANTIGUA",
  AmericaAraguaina = "AMERICA_ARAGUAINA",
  AmericaArgentinaBuenosAires = "AMERICA_ARGENTINA_BUENOS_AIRES",
  AmericaArgentinaCatamarca = "AMERICA_ARGENTINA_CATAMARCA",
  AmericaArgentinaComodrivadavia = "AMERICA_ARGENTINA_COMODRIVADAVIA",
  AmericaArgentinaCordoba = "AMERICA_ARGENTINA_CORDOBA",
  AmericaArgentinaJujuy = "AMERICA_ARGENTINA_JUJUY",
  AmericaArgentinaLaRioja = "AMERICA_ARGENTINA_LA_RIOJA",
  AmericaArgentinaMendoza = "AMERICA_ARGENTINA_MENDOZA",
  AmericaArgentinaRioGallegos = "AMERICA_ARGENTINA_RIO_GALLEGOS",
  AmericaArgentinaSalta = "AMERICA_ARGENTINA_SALTA",
  AmericaArgentinaSanJuan = "AMERICA_ARGENTINA_SAN_JUAN",
  AmericaArgentinaSanLuis = "AMERICA_ARGENTINA_SAN_LUIS",
  AmericaArgentinaTucuman = "AMERICA_ARGENTINA_TUCUMAN",
  AmericaArgentinaUshuaia = "AMERICA_ARGENTINA_USHUAIA",
  AmericaAruba = "AMERICA_ARUBA",
  AmericaAsuncion = "AMERICA_ASUNCION",
  AmericaAtikokan = "AMERICA_ATIKOKAN",
  AmericaAtka = "AMERICA_ATKA",
  AmericaBahia = "AMERICA_BAHIA",
  AmericaBahiaBanderas = "AMERICA_BAHIA_BANDERAS",
  AmericaBarbados = "AMERICA_BARBADOS",
  AmericaBelem = "AMERICA_BELEM",
  AmericaBelize = "AMERICA_BELIZE",
  AmericaBlancSablon = "AMERICA_BLANC_SABLON",
  AmericaBoaVista = "AMERICA_BOA_VISTA",
  AmericaBogota = "AMERICA_BOGOTA",
  AmericaBoise = "AMERICA_BOISE",
  AmericaBuenosAires = "AMERICA_BUENOS_AIRES",
  AmericaCambridgeBay = "AMERICA_CAMBRIDGE_BAY",
  AmericaCampoGrande = "AMERICA_CAMPO_GRANDE",
  AmericaCancun = "AMERICA_CANCUN",
  AmericaCaracas = "AMERICA_CARACAS",
  AmericaCatamarca = "AMERICA_CATAMARCA",
  AmericaCayenne = "AMERICA_CAYENNE",
  AmericaCayman = "AMERICA_CAYMAN",
  AmericaChicago = "AMERICA_CHICAGO",
  AmericaChihuahua = "AMERICA_CHIHUAHUA",
  AmericaCoralHarbour = "AMERICA_CORAL_HARBOUR",
  AmericaCordoba = "AMERICA_CORDOBA",
  AmericaCostaRica = "AMERICA_COSTA_RICA",
  AmericaCreston = "AMERICA_CRESTON",
  AmericaCuiaba = "AMERICA_CUIABA",
  AmericaCuracao = "AMERICA_CURACAO",
  AmericaDanmarkshavn = "AMERICA_DANMARKSHAVN",
  AmericaDawson = "AMERICA_DAWSON",
  AmericaDawsonCreek = "AMERICA_DAWSON_CREEK",
  AmericaDenver = "AMERICA_DENVER",
  AmericaDetroit = "AMERICA_DETROIT",
  AmericaDominica = "AMERICA_DOMINICA",
  AmericaEdmonton = "AMERICA_EDMONTON",
  AmericaEirunepe = "AMERICA_EIRUNEPE",
  AmericaElSalvador = "AMERICA_EL_SALVADOR",
  AmericaEnsenada = "AMERICA_ENSENADA",
  AmericaFortNelson = "AMERICA_FORT_NELSON",
  AmericaFortWayne = "AMERICA_FORT_WAYNE",
  AmericaFortaleza = "AMERICA_FORTALEZA",
  AmericaGlaceBay = "AMERICA_GLACE_BAY",
  AmericaGodthab = "AMERICA_GODTHAB",
  AmericaGooseBay = "AMERICA_GOOSE_BAY",
  AmericaGrandTurk = "AMERICA_GRAND_TURK",
  AmericaGrenada = "AMERICA_GRENADA",
  AmericaGuadeloupe = "AMERICA_GUADELOUPE",
  AmericaGuatemala = "AMERICA_GUATEMALA",
  AmericaGuayaquil = "AMERICA_GUAYAQUIL",
  AmericaGuyana = "AMERICA_GUYANA",
  AmericaHalifax = "AMERICA_HALIFAX",
  AmericaHavana = "AMERICA_HAVANA",
  AmericaHermosillo = "AMERICA_HERMOSILLO",
  AmericaIndianaIndianapolis = "AMERICA_INDIANA_INDIANAPOLIS",
  AmericaIndianaKnox = "AMERICA_INDIANA_KNOX",
  AmericaIndianaMarengo = "AMERICA_INDIANA_MARENGO",
  AmericaIndianaPetersburg = "AMERICA_INDIANA_PETERSBURG",
  AmericaIndianaTellCity = "AMERICA_INDIANA_TELL_CITY",
  AmericaIndianaVevay = "AMERICA_INDIANA_VEVAY",
  AmericaIndianaVincennes = "AMERICA_INDIANA_VINCENNES",
  AmericaIndianaWinamac = "AMERICA_INDIANA_WINAMAC",
  AmericaIndianapolis = "AMERICA_INDIANAPOLIS",
  AmericaInuvik = "AMERICA_INUVIK",
  AmericaIqaluit = "AMERICA_IQALUIT",
  AmericaJamaica = "AMERICA_JAMAICA",
  AmericaJujuy = "AMERICA_JUJUY",
  AmericaJuneau = "AMERICA_JUNEAU",
  AmericaKentuckyLouisville = "AMERICA_KENTUCKY_LOUISVILLE",
  AmericaKentuckyMonticello = "AMERICA_KENTUCKY_MONTICELLO",
  AmericaKnoxIn = "AMERICA_KNOX_IN",
  AmericaKralendijk = "AMERICA_KRALENDIJK",
  AmericaLaPaz = "AMERICA_LA_PAZ",
  AmericaLima = "AMERICA_LIMA",
  AmericaLosAngeles = "AMERICA_LOS_ANGELES",
  AmericaLouisville = "AMERICA_LOUISVILLE",
  AmericaLowerPrinces = "AMERICA_LOWER_PRINCES",
  AmericaMaceio = "AMERICA_MACEIO",
  AmericaManagua = "AMERICA_MANAGUA",
  AmericaManaus = "AMERICA_MANAUS",
  AmericaMarigot = "AMERICA_MARIGOT",
  AmericaMartinique = "AMERICA_MARTINIQUE",
  AmericaMatamoros = "AMERICA_MATAMOROS",
  AmericaMazatlan = "AMERICA_MAZATLAN",
  AmericaMendoza = "AMERICA_MENDOZA",
  AmericaMenominee = "AMERICA_MENOMINEE",
  AmericaMerida = "AMERICA_MERIDA",
  AmericaMetlakatla = "AMERICA_METLAKATLA",
  AmericaMexicoCity = "AMERICA_MEXICO_CITY",
  AmericaMiquelon = "AMERICA_MIQUELON",
  AmericaMoncton = "AMERICA_MONCTON",
  AmericaMonterrey = "AMERICA_MONTERREY",
  AmericaMontevideo = "AMERICA_MONTEVIDEO",
  AmericaMontreal = "AMERICA_MONTREAL",
  AmericaMontserrat = "AMERICA_MONTSERRAT",
  AmericaNassau = "AMERICA_NASSAU",
  AmericaNewYork = "AMERICA_NEW_YORK",
  AmericaNipigon = "AMERICA_NIPIGON",
  AmericaNome = "AMERICA_NOME",
  AmericaNoronha = "AMERICA_NORONHA",
  AmericaNorthDakotaBeulah = "AMERICA_NORTH_DAKOTA_BEULAH",
  AmericaNorthDakotaCenter = "AMERICA_NORTH_DAKOTA_CENTER",
  AmericaNorthDakotaNewSalem = "AMERICA_NORTH_DAKOTA_NEW_SALEM",
  AmericaNuuk = "AMERICA_NUUK",
  AmericaOjinaga = "AMERICA_OJINAGA",
  AmericaPanama = "AMERICA_PANAMA",
  AmericaPangnirtung = "AMERICA_PANGNIRTUNG",
  AmericaParamaribo = "AMERICA_PARAMARIBO",
  AmericaPhoenix = "AMERICA_PHOENIX",
  AmericaPortAuPrince = "AMERICA_PORT_AU_PRINCE",
  AmericaPortOfSpain = "AMERICA_PORT_OF_SPAIN",
  AmericaPortoAcre = "AMERICA_PORTO_ACRE",
  AmericaPortoVelho = "AMERICA_PORTO_VELHO",
  AmericaPuertoRico = "AMERICA_PUERTO_RICO",
  AmericaPuntaArenas = "AMERICA_PUNTA_ARENAS",
  AmericaRainyRiver = "AMERICA_RAINY_RIVER",
  AmericaRankinInlet = "AMERICA_RANKIN_INLET",
  AmericaRecife = "AMERICA_RECIFE",
  AmericaRegina = "AMERICA_REGINA",
  AmericaResolute = "AMERICA_RESOLUTE",
  AmericaRioBranco = "AMERICA_RIO_BRANCO",
  AmericaRosario = "AMERICA_ROSARIO",
  AmericaSantaIsabel = "AMERICA_SANTA_ISABEL",
  AmericaSantarem = "AMERICA_SANTAREM",
  AmericaSantiago = "AMERICA_SANTIAGO",
  AmericaSantoDomingo = "AMERICA_SANTO_DOMINGO",
  AmericaSaoPaulo = "AMERICA_SAO_PAULO",
  AmericaScoresbysund = "AMERICA_SCORESBYSUND",
  AmericaShiprock = "AMERICA_SHIPROCK",
  AmericaSitka = "AMERICA_SITKA",
  AmericaStBarthelemy = "AMERICA_ST_BARTHELEMY",
  AmericaStJohns = "AMERICA_ST_JOHNS",
  AmericaStKitts = "AMERICA_ST_KITTS",
  AmericaStLucia = "AMERICA_ST_LUCIA",
  AmericaStThomas = "AMERICA_ST_THOMAS",
  AmericaStVincent = "AMERICA_ST_VINCENT",
  AmericaSwiftCurrent = "AMERICA_SWIFT_CURRENT",
  AmericaTegucigalpa = "AMERICA_TEGUCIGALPA",
  AmericaThule = "AMERICA_THULE",
  AmericaThunderBay = "AMERICA_THUNDER_BAY",
  AmericaTijuana = "AMERICA_TIJUANA",
  AmericaToronto = "AMERICA_TORONTO",
  AmericaTortola = "AMERICA_TORTOLA",
  AmericaVancouver = "AMERICA_VANCOUVER",
  AmericaVirgin = "AMERICA_VIRGIN",
  AmericaWhitehorse = "AMERICA_WHITEHORSE",
  AmericaWinnipeg = "AMERICA_WINNIPEG",
  AmericaYakutat = "AMERICA_YAKUTAT",
  AmericaYellowknife = "AMERICA_YELLOWKNIFE",
  AntarcticaCasey = "ANTARCTICA_CASEY",
  AntarcticaDavis = "ANTARCTICA_DAVIS",
  AntarcticaDumontdurville = "ANTARCTICA_DUMONTDURVILLE",
  AntarcticaMacquarie = "ANTARCTICA_MACQUARIE",
  AntarcticaMawson = "ANTARCTICA_MAWSON",
  AntarcticaMcmurdo = "ANTARCTICA_MCMURDO",
  AntarcticaPalmer = "ANTARCTICA_PALMER",
  AntarcticaRothera = "ANTARCTICA_ROTHERA",
  AntarcticaSouthPole = "ANTARCTICA_SOUTH_POLE",
  AntarcticaSyowa = "ANTARCTICA_SYOWA",
  AntarcticaTroll = "ANTARCTICA_TROLL",
  AntarcticaVostok = "ANTARCTICA_VOSTOK",
  ArcticLongyearbyen = "ARCTIC_LONGYEARBYEN",
  AsiaAden = "ASIA_ADEN",
  AsiaAlmaty = "ASIA_ALMATY",
  AsiaAmman = "ASIA_AMMAN",
  AsiaAnadyr = "ASIA_ANADYR",
  AsiaAqtau = "ASIA_AQTAU",
  AsiaAqtobe = "ASIA_AQTOBE",
  AsiaAshgabat = "ASIA_ASHGABAT",
  AsiaAshkhabad = "ASIA_ASHKHABAD",
  AsiaAtyrau = "ASIA_ATYRAU",
  AsiaBaghdad = "ASIA_BAGHDAD",
  AsiaBahrain = "ASIA_BAHRAIN",
  AsiaBaku = "ASIA_BAKU",
  AsiaBangkok = "ASIA_BANGKOK",
  AsiaBarnaul = "ASIA_BARNAUL",
  AsiaBeirut = "ASIA_BEIRUT",
  AsiaBishkek = "ASIA_BISHKEK",
  AsiaBrunei = "ASIA_BRUNEI",
  AsiaCalcutta = "ASIA_CALCUTTA",
  AsiaChita = "ASIA_CHITA",
  AsiaChoibalsan = "ASIA_CHOIBALSAN",
  AsiaChongqing = "ASIA_CHONGQING",
  AsiaChungking = "ASIA_CHUNGKING",
  AsiaColombo = "ASIA_COLOMBO",
  AsiaDacca = "ASIA_DACCA",
  AsiaDamascus = "ASIA_DAMASCUS",
  AsiaDhaka = "ASIA_DHAKA",
  AsiaDili = "ASIA_DILI",
  AsiaDubai = "ASIA_DUBAI",
  AsiaDushanbe = "ASIA_DUSHANBE",
  AsiaFamagusta = "ASIA_FAMAGUSTA",
  AsiaGaza = "ASIA_GAZA",
  AsiaHarbin = "ASIA_HARBIN",
  AsiaHebron = "ASIA_HEBRON",
  AsiaHoChiMinh = "ASIA_HO_CHI_MINH",
  AsiaHongKong = "ASIA_HONG_KONG",
  AsiaHovd = "ASIA_HOVD",
  AsiaIrkutsk = "ASIA_IRKUTSK",
  AsiaIstanbul = "ASIA_ISTANBUL",
  AsiaJakarta = "ASIA_JAKARTA",
  AsiaJayapura = "ASIA_JAYAPURA",
  AsiaJerusalem = "ASIA_JERUSALEM",
  AsiaKabul = "ASIA_KABUL",
  AsiaKamchatka = "ASIA_KAMCHATKA",
  AsiaKarachi = "ASIA_KARACHI",
  AsiaKashgar = "ASIA_KASHGAR",
  AsiaKathmandu = "ASIA_KATHMANDU",
  AsiaKatmandu = "ASIA_KATMANDU",
  AsiaKhandyga = "ASIA_KHANDYGA",
  AsiaKolkata = "ASIA_KOLKATA",
  AsiaKrasnoyarsk = "ASIA_KRASNOYARSK",
  AsiaKualaLumpur = "ASIA_KUALA_LUMPUR",
  AsiaKuching = "ASIA_KUCHING",
  AsiaKuwait = "ASIA_KUWAIT",
  AsiaMacao = "ASIA_MACAO",
  AsiaMacau = "ASIA_MACAU",
  AsiaMagadan = "ASIA_MAGADAN",
  AsiaMakassar = "ASIA_MAKASSAR",
  AsiaManila = "ASIA_MANILA",
  AsiaMuscat = "ASIA_MUSCAT",
  AsiaNicosia = "ASIA_NICOSIA",
  AsiaNovokuznetsk = "ASIA_NOVOKUZNETSK",
  AsiaNovosibirsk = "ASIA_NOVOSIBIRSK",
  AsiaOmsk = "ASIA_OMSK",
  AsiaOral = "ASIA_ORAL",
  AsiaPhnomPenh = "ASIA_PHNOM_PENH",
  AsiaPontianak = "ASIA_PONTIANAK",
  AsiaPyongyang = "ASIA_PYONGYANG",
  AsiaQatar = "ASIA_QATAR",
  AsiaQostanay = "ASIA_QOSTANAY",
  AsiaQyzylorda = "ASIA_QYZYLORDA",
  AsiaRangoon = "ASIA_RANGOON",
  AsiaRiyadh = "ASIA_RIYADH",
  AsiaSaigon = "ASIA_SAIGON",
  AsiaSakhalin = "ASIA_SAKHALIN",
  AsiaSamarkand = "ASIA_SAMARKAND",
  AsiaSeoul = "ASIA_SEOUL",
  AsiaShanghai = "ASIA_SHANGHAI",
  AsiaSingapore = "ASIA_SINGAPORE",
  AsiaSrednekolymsk = "ASIA_SREDNEKOLYMSK",
  AsiaTaipei = "ASIA_TAIPEI",
  AsiaTashkent = "ASIA_TASHKENT",
  AsiaTbilisi = "ASIA_TBILISI",
  AsiaTehran = "ASIA_TEHRAN",
  AsiaTelAviv = "ASIA_TEL_AVIV",
  AsiaThimbu = "ASIA_THIMBU",
  AsiaThimphu = "ASIA_THIMPHU",
  AsiaTokyo = "ASIA_TOKYO",
  AsiaTomsk = "ASIA_TOMSK",
  AsiaUjungPandang = "ASIA_UJUNG_PANDANG",
  AsiaUlaanbaatar = "ASIA_ULAANBAATAR",
  AsiaUlanBator = "ASIA_ULAN_BATOR",
  AsiaUrumqi = "ASIA_URUMQI",
  AsiaUstNera = "ASIA_UST_NERA",
  AsiaVientiane = "ASIA_VIENTIANE",
  AsiaVladivostok = "ASIA_VLADIVOSTOK",
  AsiaYakutsk = "ASIA_YAKUTSK",
  AsiaYangon = "ASIA_YANGON",
  AsiaYekaterinburg = "ASIA_YEKATERINBURG",
  AsiaYerevan = "ASIA_YEREVAN",
  AtlanticAzores = "ATLANTIC_AZORES",
  AtlanticBermuda = "ATLANTIC_BERMUDA",
  AtlanticCanary = "ATLANTIC_CANARY",
  AtlanticCapeVerde = "ATLANTIC_CAPE_VERDE",
  AtlanticFaeroe = "ATLANTIC_FAEROE",
  AtlanticFaroe = "ATLANTIC_FAROE",
  AtlanticJanMayen = "ATLANTIC_JAN_MAYEN",
  AtlanticMadeira = "ATLANTIC_MADEIRA",
  AtlanticReykjavik = "ATLANTIC_REYKJAVIK",
  AtlanticSouthGeorgia = "ATLANTIC_SOUTH_GEORGIA",
  AtlanticStHelena = "ATLANTIC_ST_HELENA",
  AtlanticStanley = "ATLANTIC_STANLEY",
  AustraliaAct = "AUSTRALIA_ACT",
  AustraliaAdelaide = "AUSTRALIA_ADELAIDE",
  AustraliaBrisbane = "AUSTRALIA_BRISBANE",
  AustraliaBrokenHill = "AUSTRALIA_BROKEN_HILL",
  AustraliaCanberra = "AUSTRALIA_CANBERRA",
  AustraliaCurrie = "AUSTRALIA_CURRIE",
  AustraliaDarwin = "AUSTRALIA_DARWIN",
  AustraliaEucla = "AUSTRALIA_EUCLA",
  AustraliaHobart = "AUSTRALIA_HOBART",
  AustraliaLhi = "AUSTRALIA_LHI",
  AustraliaLindeman = "AUSTRALIA_LINDEMAN",
  AustraliaLordHowe = "AUSTRALIA_LORD_HOWE",
  AustraliaMelbourne = "AUSTRALIA_MELBOURNE",
  AustraliaNsw = "AUSTRALIA_NSW",
  AustraliaNorth = "AUSTRALIA_NORTH",
  AustraliaPerth = "AUSTRALIA_PERTH",
  AustraliaQueensland = "AUSTRALIA_QUEENSLAND",
  AustraliaSouth = "AUSTRALIA_SOUTH",
  AustraliaSydney = "AUSTRALIA_SYDNEY",
  AustraliaTasmania = "AUSTRALIA_TASMANIA",
  AustraliaVictoria = "AUSTRALIA_VICTORIA",
  AustraliaWest = "AUSTRALIA_WEST",
  AustraliaYancowinna = "AUSTRALIA_YANCOWINNA",
  BrazilAcre = "BRAZIL_ACRE",
  BrazilDenoronha = "BRAZIL_DENORONHA",
  BrazilEast = "BRAZIL_EAST",
  BrazilWest = "BRAZIL_WEST",
  Cet = "CET",
  Cst6Cdt = "CST6CDT",
  CanadaAtlantic = "CANADA_ATLANTIC",
  CanadaCentral = "CANADA_CENTRAL",
  CanadaEastern = "CANADA_EASTERN",
  CanadaMountain = "CANADA_MOUNTAIN",
  CanadaNewfoundland = "CANADA_NEWFOUNDLAND",
  CanadaPacific = "CANADA_PACIFIC",
  CanadaSaskatchewan = "CANADA_SASKATCHEWAN",
  CanadaYukon = "CANADA_YUKON",
  ChileContinental = "CHILE_CONTINENTAL",
  ChileEasterisland = "CHILE_EASTERISLAND",
  Cuba = "CUBA",
  Eet = "EET",
  Est = "EST",
  Est5Edt = "EST5EDT",
  Egypt = "EGYPT",
  Eire = "EIRE",
  EtcGmt = "ETC_GMT",
  EtcGmt_0 = "ETC_GMT_0",
  EtcGmt_1 = "ETC_GMT_1",
  EtcGmt_10 = "ETC_GMT_10",
  EtcGmt_11 = "ETC_GMT_11",
  EtcGmt_12 = "ETC_GMT_12",
  EtcGmt_2 = "ETC_GMT_2",
  EtcGmt_3 = "ETC_GMT_3",
  EtcGmt_4 = "ETC_GMT_4",
  EtcGmt_5 = "ETC_GMT_5",
  EtcGmt_6 = "ETC_GMT_6",
  EtcGmt_7 = "ETC_GMT_7",
  EtcGmt_8 = "ETC_GMT_8",
  EtcGmt_9 = "ETC_GMT_9",
  EtcGmt_0_404 = "ETC_GMT_0_404",
  EtcGmt_1_405 = "ETC_GMT_1_405",
  EtcGmt_10_406 = "ETC_GMT_10_406",
  EtcGmt_11_407 = "ETC_GMT_11_407",
  EtcGmt_12_408 = "ETC_GMT_12_408",
  EtcGmt_13 = "ETC_GMT_13",
  EtcGmt_14 = "ETC_GMT_14",
  EtcGmt_2_411 = "ETC_GMT_2_411",
  EtcGmt_3_412 = "ETC_GMT_3_412",
  EtcGmt_4_413 = "ETC_GMT_4_413",
  EtcGmt_5_414 = "ETC_GMT_5_414",
  EtcGmt_6_415 = "ETC_GMT_6_415",
  EtcGmt_7_416 = "ETC_GMT_7_416",
  EtcGmt_8_417 = "ETC_GMT_8_417",
  EtcGmt_9_418 = "ETC_GMT_9_418",
  EtcGmt0 = "ETC_GMT0",
  EtcGreenwich = "ETC_GREENWICH",
  EtcUct = "ETC_UCT",
  EtcUtc = "ETC_UTC",
  EtcUniversal = "ETC_UNIVERSAL",
  EtcZulu = "ETC_ZULU",
  EuropeAmsterdam = "EUROPE_AMSTERDAM",
  EuropeAndorra = "EUROPE_ANDORRA",
  EuropeAstrakhan = "EUROPE_ASTRAKHAN",
  EuropeAthens = "EUROPE_ATHENS",
  EuropeBelfast = "EUROPE_BELFAST",
  EuropeBelgrade = "EUROPE_BELGRADE",
  EuropeBerlin = "EUROPE_BERLIN",
  EuropeBratislava = "EUROPE_BRATISLAVA",
  EuropeBrussels = "EUROPE_BRUSSELS",
  EuropeBucharest = "EUROPE_BUCHAREST",
  EuropeBudapest = "EUROPE_BUDAPEST",
  EuropeBusingen = "EUROPE_BUSINGEN",
  EuropeChisinau = "EUROPE_CHISINAU",
  EuropeCopenhagen = "EUROPE_COPENHAGEN",
  EuropeDublin = "EUROPE_DUBLIN",
  EuropeGibraltar = "EUROPE_GIBRALTAR",
  EuropeGuernsey = "EUROPE_GUERNSEY",
  EuropeHelsinki = "EUROPE_HELSINKI",
  EuropeIsleOfMan = "EUROPE_ISLE_OF_MAN",
  EuropeIstanbul = "EUROPE_ISTANBUL",
  EuropeJersey = "EUROPE_JERSEY",
  EuropeKaliningrad = "EUROPE_KALININGRAD",
  EuropeKiev = "EUROPE_KIEV",
  EuropeKirov = "EUROPE_KIROV",
  EuropeKyiv = "EUROPE_KYIV",
  EuropeLisbon = "EUROPE_LISBON",
  EuropeLjubljana = "EUROPE_LJUBLJANA",
  EuropeLondon = "EUROPE_LONDON",
  EuropeLuxembourg = "EUROPE_LUXEMBOURG",
  EuropeMadrid = "EUROPE_MADRID",
  EuropeMalta = "EUROPE_MALTA",
  EuropeMariehamn = "EUROPE_MARIEHAMN",
  EuropeMinsk = "EUROPE_MINSK",
  EuropeMonaco = "EUROPE_MONACO",
  EuropeMoscow = "EUROPE_MOSCOW",
  EuropeNicosia = "EUROPE_NICOSIA",
  EuropeOslo = "EUROPE_OSLO",
  EuropeParis = "EUROPE_PARIS",
  EuropePodgorica = "EUROPE_PODGORICA",
  EuropePrague = "EUROPE_PRAGUE",
  EuropeRiga = "EUROPE_RIGA",
  EuropeRome = "EUROPE_ROME",
  EuropeSamara = "EUROPE_SAMARA",
  EuropeSanMarino = "EUROPE_SAN_MARINO",
  EuropeSarajevo = "EUROPE_SARAJEVO",
  EuropeSaratov = "EUROPE_SARATOV",
  EuropeSimferopol = "EUROPE_SIMFEROPOL",
  EuropeSkopje = "EUROPE_SKOPJE",
  EuropeSofia = "EUROPE_SOFIA",
  EuropeStockholm = "EUROPE_STOCKHOLM",
  EuropeTallinn = "EUROPE_TALLINN",
  EuropeTirane = "EUROPE_TIRANE",
  EuropeTiraspol = "EUROPE_TIRASPOL",
  EuropeUlyanovsk = "EUROPE_ULYANOVSK",
  EuropeUzhgorod = "EUROPE_UZHGOROD",
  EuropeVaduz = "EUROPE_VADUZ",
  EuropeVatican = "EUROPE_VATICAN",
  EuropeVienna = "EUROPE_VIENNA",
  EuropeVilnius = "EUROPE_VILNIUS",
  EuropeVolgograd = "EUROPE_VOLGOGRAD",
  EuropeWarsaw = "EUROPE_WARSAW",
  EuropeZagreb = "EUROPE_ZAGREB",
  EuropeZaporozhye = "EUROPE_ZAPOROZHYE",
  EuropeZurich = "EUROPE_ZURICH",
  Gb = "GB",
  GbEire = "GB_EIRE",
  Gmt = "GMT",
  Gmt_0 = "GMT_0",
  Gmt_0_493 = "GMT_0_493",
  Gmt0 = "GMT0",
  Greenwich = "GREENWICH",
  Hst = "HST",
  Hongkong = "HONGKONG",
  Iceland = "ICELAND",
  IndianAntananarivo = "INDIAN_ANTANANARIVO",
  IndianChagos = "INDIAN_CHAGOS",
  IndianChristmas = "INDIAN_CHRISTMAS",
  IndianCocos = "INDIAN_COCOS",
  IndianComoro = "INDIAN_COMORO",
  IndianKerguelen = "INDIAN_KERGUELEN",
  IndianMahe = "INDIAN_MAHE",
  IndianMaldives = "INDIAN_MALDIVES",
  IndianMauritius = "INDIAN_MAURITIUS",
  IndianMayotte = "INDIAN_MAYOTTE",
  IndianReunion = "INDIAN_REUNION",
  Iran = "IRAN",
  Israel = "ISRAEL",
  Jamaica = "JAMAICA",
  Japan = "JAPAN",
  Kwajalein = "KWAJALEIN",
  Libya = "LIBYA",
  Met = "MET",
  Mst = "MST",
  Mst7Mdt = "MST7MDT",
  MexicoBajanorte = "MEXICO_BAJANORTE",
  MexicoBajasur = "MEXICO_BAJASUR",
  MexicoGeneral = "MEXICO_GENERAL",
  Nz = "NZ",
  NzChat = "NZ_CHAT",
  Navajo = "NAVAJO",
  Prc = "PRC",
  Pst8Pdt = "PST8PDT",
  PacificApia = "PACIFIC_APIA",
  PacificAuckland = "PACIFIC_AUCKLAND",
  PacificBougainville = "PACIFIC_BOUGAINVILLE",
  PacificChatham = "PACIFIC_CHATHAM",
  PacificChuuk = "PACIFIC_CHUUK",
  PacificEaster = "PACIFIC_EASTER",
  PacificEfate = "PACIFIC_EFATE",
  PacificEnderbury = "PACIFIC_ENDERBURY",
  PacificFakaofo = "PACIFIC_FAKAOFO",
  PacificFiji = "PACIFIC_FIJI",
  PacificFunafuti = "PACIFIC_FUNAFUTI",
  PacificGalapagos = "PACIFIC_GALAPAGOS",
  PacificGambier = "PACIFIC_GAMBIER",
  PacificGuadalcanal = "PACIFIC_GUADALCANAL",
  PacificGuam = "PACIFIC_GUAM",
  PacificHonolulu = "PACIFIC_HONOLULU",
  PacificJohnston = "PACIFIC_JOHNSTON",
  PacificKanton = "PACIFIC_KANTON",
  PacificKiritimati = "PACIFIC_KIRITIMATI",
  PacificKosrae = "PACIFIC_KOSRAE",
  PacificKwajalein = "PACIFIC_KWAJALEIN",
  PacificMajuro = "PACIFIC_MAJURO",
  PacificMarquesas = "PACIFIC_MARQUESAS",
  PacificMidway = "PACIFIC_MIDWAY",
  PacificNauru = "PACIFIC_NAURU",
  PacificNiue = "PACIFIC_NIUE",
  PacificNorfolk = "PACIFIC_NORFOLK",
  PacificNoumea = "PACIFIC_NOUMEA",
  PacificPagoPago = "PACIFIC_PAGO_PAGO",
  PacificPalau = "PACIFIC_PALAU",
  PacificPitcairn = "PACIFIC_PITCAIRN",
  PacificPohnpei = "PACIFIC_POHNPEI",
  PacificPonape = "PACIFIC_PONAPE",
  PacificPortMoresby = "PACIFIC_PORT_MORESBY",
  PacificRarotonga = "PACIFIC_RAROTONGA",
  PacificSaipan = "PACIFIC_SAIPAN",
  PacificSamoa = "PACIFIC_SAMOA",
  PacificTahiti = "PACIFIC_TAHITI",
  PacificTarawa = "PACIFIC_TARAWA",
  PacificTongatapu = "PACIFIC_TONGATAPU",
  PacificTruk = "PACIFIC_TRUK",
  PacificWake = "PACIFIC_WAKE",
  PacificWallis = "PACIFIC_WALLIS",
  PacificYap = "PACIFIC_YAP",
  Poland = "POLAND",
  Portugal = "PORTUGAL",
  Roc = "ROC",
  Rok = "ROK",
  Singapore = "SINGAPORE",
  Turkey = "TURKEY",
  Uct = "UCT",
  UsAlaska = "US_ALASKA",
  UsAleutian = "US_ALEUTIAN",
  UsArizona = "US_ARIZONA",
  UsCentral = "US_CENTRAL",
  UsEastIndiana = "US_EAST_INDIANA",
  UsEastern = "US_EASTERN",
  UsHawaii = "US_HAWAII",
  UsIndianaStarke = "US_INDIANA_STARKE",
  UsMichigan = "US_MICHIGAN",
  UsMountain = "US_MOUNTAIN",
  UsPacific = "US_PACIFIC",
  UsSamoa = "US_SAMOA",
  Utc = "UTC",
  Universal = "UNIVERSAL",
  WSu = "W_SU",
  Wet = "WET",
  Zulu = "ZULU",
}

export type UserDetailType = {
  __typename?: "UserDetailType";
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  uuid: Scalars["UUID"];
  userObj: UserType;
  photo?: Maybe<Scalars["String"]>;
  role: Array<RoleType>;
  addresses: Array<AddressType>;
  timezone: UserDetailTimezone;
  deactivatedDateTime?: Maybe<Scalars["DateTime"]>;
  hasLoggedInWebAppAfterRebrand: Scalars["Boolean"];
  hasBiometricsFeaturesEnabled: Scalars["Boolean"];
  reasonForDeactivation?: Maybe<Scalars["String"]>;
  hasClickedBiometricsModalTellMeMore: Scalars["Boolean"];
  hasClickedBiometricsModalRemindMeLater: Scalars["Boolean"];
  biometricsModalNextTriggerDate?: Maybe<Scalars["Date"]>;
  hasClickedBiometricsModalDontAskAgain: Scalars["Boolean"];
  hasTrackBiometricsCtaEnabled: Scalars["Boolean"];
  signedUpVia?: Maybe<Scalars["String"]>;
  usernotificationpermissions?: Maybe<UserNotificationPermissionsType>;
  studentdetail?: Maybe<StudentDetailType>;
  teacherdetail?: Maybe<TeacherDetailType>;
  userfavourites?: Maybe<UserFavouritesType>;
  biometricsvitaluser?: Maybe<BiometricsVitalUserType>;
};

export type UserDetailUpdateInput = {
  roles?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  addressList?: Maybe<Array<Maybe<Scalars["JSONString"]>>>;
  photo?: Maybe<Scalars["String"]>;
  timezone?: Maybe<Scalars["String"]>;
};

export type UserFavouritesInput = {
  groupSessionInstances?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  articles?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  teachers?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  remove?: Maybe<Scalars["Boolean"]>;
};

export type UserFavouritesType = {
  __typename?: "UserFavouritesType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  userdetailObj: UserDetailType;
  recordings: Array<GroupSessionInstanceType>;
  articles: Array<ArticleType>;
  teachers: Array<TeacherDetailType>;
  totalRecordings?: Maybe<Scalars["Int"]>;
  totalArticles?: Maybe<Scalars["Int"]>;
  totalTeachers?: Maybe<Scalars["Int"]>;
};

export type UserJoinedGroupSession = {
  __typename?: "UserJoinedGroupSession";
  ok?: Maybe<Scalars["Boolean"]>;
  eventCreated?: Maybe<Scalars["Boolean"]>;
  groupSessionPersonJoining?: Maybe<GroupSessionPeopleJoiningType>;
};

export type UserJoinedGroupSessionInput = {
  groupSessionInstanceID: Scalars["ID"];
  sessionJoiningPlatform: Scalars["String"];
};

export type UserNotificationPermissionResponse = {
  __typename?: "UserNotificationPermissionResponse";
  sessionReminders?: Maybe<Scalars["Boolean"]>;
  calendarInvitesPermissionForMeditation?: Maybe<Scalars["Boolean"]>;
  calendarInvitesPermissionForNutrition?: Maybe<Scalars["Boolean"]>;
  calendarInvitesPermissionForScience?: Maybe<Scalars["Boolean"]>;
  calendarInvitesPermissionForTaster?: Maybe<Scalars["Boolean"]>;
  calendarInvitesPermissionForYoga?: Maybe<Scalars["Boolean"]>;
  permissionToSendCalendarInvites?: Maybe<Scalars["Boolean"]>;
  /** @deprecated not required */
  id?: Maybe<Scalars["ID"]>;
  /** @deprecated deleted from DB */
  mindfulMoments?: Maybe<Scalars["Boolean"]>;
  /** @deprecated deleted from DB */
  trackingAndGoals?: Maybe<Scalars["Boolean"]>;
};

export type UserNotificationPermissionsInput = {
  sessionReminders?: Maybe<Scalars["Boolean"]>;
  calendarInvitesPermissionForMeditation?: Maybe<Scalars["Boolean"]>;
  calendarInvitesPermissionForNutrition?: Maybe<Scalars["Boolean"]>;
  calendarInvitesPermissionForScience?: Maybe<Scalars["Boolean"]>;
  calendarInvitesPermissionForTaster?: Maybe<Scalars["Boolean"]>;
  calendarInvitesPermissionForYoga?: Maybe<Scalars["Boolean"]>;
  permissionToSendCalendarInvites?: Maybe<Scalars["Boolean"]>;
  mindfulMoments?: Maybe<Scalars["Boolean"]>;
  trackingAndGoals?: Maybe<Scalars["Boolean"]>;
};

export type UserNotificationPermissionsType = {
  __typename?: "UserNotificationPermissionsType";
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  userdetailObj: UserDetailType;
  sessionReminders?: Maybe<Scalars["Boolean"]>;
  calendarInvitesPermissionForMeditation?: Maybe<Scalars["Boolean"]>;
  calendarInvitesPermissionForNutrition?: Maybe<Scalars["Boolean"]>;
  calendarInvitesPermissionForScience?: Maybe<Scalars["Boolean"]>;
  calendarInvitesPermissionForTaster?: Maybe<Scalars["Boolean"]>;
  calendarInvitesPermissionForYoga?: Maybe<Scalars["Boolean"]>;
  permissionToSendCalendarInvites?: Maybe<Scalars["Boolean"]>;
  mindfulMoments?: Maybe<Scalars["Boolean"]>;
  trackingAndGoals?: Maybe<Scalars["Boolean"]>;
};

export type UserSessionLink = {
  __typename?: "UserSessionLink";
  ok?: Maybe<Scalars["Boolean"]>;
  user?: Maybe<UserType>;
  sessionId?: Maybe<Scalars["ID"]>;
  sessionType?: Maybe<Scalars["String"]>;
  groupSessionInstance?: Maybe<GroupSessionInstanceType>;
  privateSession?: Maybe<ClassSessionType>;
};

export type UserSessionLinkInput = {
  userId?: Maybe<Scalars["String"]>;
  sessionType?: Maybe<Scalars["String"]>;
  sessionId?: Maybe<Scalars["String"]>;
};

export type UserSurveyInput = {
  surveyType?: Maybe<Scalars["String"]>;
  deviceName?: Maybe<Scalars["String"]>;
  appPlatform?: Maybe<Scalars["String"]>;
  appVersion?: Maybe<Scalars["String"]>;
  data?: Maybe<Scalars["GenericScalar"]>;
};

export type UserType = {
  __typename?: "UserType";
  id: Scalars["ID"];
  lastLogin?: Maybe<Scalars["DateTime"]>;
  isSuperuser: Scalars["Boolean"];
  username: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  isStaff: Scalars["Boolean"];
  isActive: Scalars["Boolean"];
  dateJoined: Scalars["DateTime"];
  fcmdeviceSet: Array<FcmDeviceTypeModel>;
  userdetail?: Maybe<UserDetailType>;
  groupsessionSet: Array<GroupSessionType>;
  groupsessionpeoplejoiningSet: Array<GroupSessionPeopleJoiningType>;
  classsessionSet: Array<ClassSessionType>;
  appfeedbackSet: Array<AppFeedbackType>;
  studentfeedbackbyteacherSet: Array<StudentFeedbackByTeacherType>;
  sessionfeedbackSet: Array<SessionFeedbackType>;
  emailtemplateSet: Array<EmailTemplateType>;
  sessioncalendarinviteSet: Array<SessionCalendarInviteType>;
  biometrics?: Maybe<BiometricsType>;
  isFirstSignIn?: Maybe<Scalars["String"]>;
};

export type UserUpdateInput = {
  email?: Maybe<Scalars["String"]>;
  roles?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
};

export type Verify = {
  __typename?: "Verify";
  payload: Scalars["GenericScalar"];
};

export type VerifyToken = {
  __typename?: "VerifyToken";
  success: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  subTitle?: Maybe<Scalars["String"]>;
  pageState: Scalars["String"];
  companyLogo?: Maybe<Scalars["String"]>;
};

export type ViewYourEngagement = {
  __typename?: "ViewYourEngagement";
  labels?: Maybe<Array<Maybe<Scalars["String"]>>>;
  totalSessionAttendeeCount?: Maybe<Scalars["Int"]>;
  engagedEmployeeCount?: Maybe<Scalars["Int"]>;
  data?: Maybe<Array<Maybe<EmployeeGraphRecord>>>;
  dates?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type VitalCreateUser = {
  __typename?: "VitalCreateUser";
  ok?: Maybe<Scalars["Boolean"]>;
  user: UserType;
};

export type VitalDeleteUser = {
  __typename?: "VitalDeleteUser";
  ok?: Maybe<Scalars["Boolean"]>;
  user: UserType;
};

export type VitalDeregisterProvider = {
  __typename?: "VitalDeregisterProvider";
  ok?: Maybe<Scalars["Boolean"]>;
  user: UserType;
};

export type VitalLink = {
  __typename?: "VitalLink";
  ok?: Maybe<Scalars["Boolean"]>;
  token: Scalars["String"];
  url: Scalars["String"];
  user: UserType;
};

export type VitalOAuthProviderType = {
  __typename?: "VitalOAuthProviderType";
  id: Scalars["String"];
  name: Scalars["String"];
  slug: Scalars["String"];
  description: Scalars["String"];
  logo: Scalars["String"];
  authType?: Maybe<Scalars["String"]>;
  group?: Maybe<Scalars["String"]>;
  oauthUrl?: Maybe<Scalars["String"]>;
  isActive?: Maybe<Scalars["String"]>;
  backfillNumDays?: Maybe<Scalars["String"]>;
};

export type VitalProviderType = {
  __typename?: "VitalProviderType";
  name?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  logo?: Maybe<Scalars["String"]>;
  authType?: Maybe<Scalars["String"]>;
  supportedResources?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type WelcomeScreen = {
  __typename?: "WelcomeScreen";
  titleHtml: Scalars["String"];
  subtitleHtml: Scalars["String"];
  buttonText?: Maybe<Scalars["String"]>;
};

export type FiltersType = {
  __typename?: "filtersType";
  practitioners?: Maybe<Array<Maybe<TeacherDetailType>>>;
  services?: Maybe<Array<Maybe<ServiceType1>>>;
  durations?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type LearnerGroupSessionsListPartsFragment = {
  __typename?: "LearnerGroupSessionsList";
} & Pick<LearnerGroupSessionsList, "id" | "label"> & {
    items: Array<
      {
        __typename: "LearnerGroupSession";
      } & LearnerSessionCardParts_LearnerGroupSession_Fragment
    >;
  };

export type LearnerFeaturedSessionsListPartsFragment = {
  __typename?: "LearnerFeaturedSessionList";
} & Pick<LearnerFeaturedSessionList, "id" | "label"> & {
    items: Array<
      | ({
          __typename: "LearnerGroupSession";
        } & LearnerSessionCardParts_LearnerGroupSession_Fragment)
      | { __typename: "LearnerPrivateSession" }
    >;
  };

export type LearnerSessionsListPartsFragment = {
  __typename?: "LearnerSessionsList";
} & Pick<LearnerSessionsList, "id" | "label"> & {
    items: Array<
      | ({
          __typename: "LearnerGroupSession";
        } & LearnerSessionCardParts_LearnerGroupSession_Fragment)
      | { __typename: "LearnerPrivateSession" }
    >;
  };

export type LearnerGroupSessionPartsFragment = {
  __typename?: "LearnerGroupSession";
} & Pick<
  LearnerGroupSession,
  | "id"
  | "title"
  | "subtitle"
  | "pillarLabel"
  | "service"
  | "duration"
  | "filterTags"
  | "date"
  | "time"
  | "timeZone"
  | "about"
  | "imageUrl"
> & {
    equipment?: Maybe<
      Array<
        { __typename?: "LearnerEquipment" } & Pick<
          LearnerEquipment,
          "id" | "label" | "icon"
        >
      >
    >;
    practitioner: {
      __typename?: "LearnerPractitioner";
    } & LearnerPractitionerCardPartsFragment;
    buttons: { __typename?: "LearnerGroupSessionActionButtons" } & {
      join?: Maybe<
        { __typename?: "LearnerGroupSessionActionButton" } & Pick<
          LearnerGroupSessionActionButton,
          "style" | "action" | "text"
        >
      >;
      register?: Maybe<
        { __typename?: "LearnerGroupSessionActionButton" } & Pick<
          LearnerGroupSessionActionButton,
          "style" | "action" | "text"
        >
      >;
      unRegister?: Maybe<
        { __typename?: "LearnerGroupSessionActionButton" } & Pick<
          LearnerGroupSessionActionButton,
          "style" | "action" | "text"
        >
      >;
      trackBiometrics?: Maybe<
        { __typename?: "LearnerGroupSessionActionButton" } & Pick<
          LearnerGroupSessionActionButton,
          "style" | "action" | "text"
        >
      >;
    };
    biometrics?: Maybe<
      { __typename?: "LearnerSessionBiometrics" } & Pick<
        LearnerSessionBiometrics,
        "label"
      >
    >;
  };

export type LearnerArticlePartsFragment = {
  __typename?: "LearnerArticle";
} & Pick<
  LearnerArticle,
  | "id"
  | "title"
  | "subtitle"
  | "pillarLabel"
  | "imageUrl"
  | "contentHtml"
  | "isFavourite"
>;

export type LearnerArticlesListPartsFragment = {
  __typename?: "LearnerArticlesList";
} & Pick<LearnerArticlesList, "id" | "label"> & {
    items: Array<
      { __typename: "LearnerArticle" } & LearnerArticlePartsFragment
    >;
  };

export type LearnerRecordingPartsFragment = {
  __typename?: "LearnerRecording";
} & Pick<
  LearnerRecording,
  | "id"
  | "title"
  | "subtitle"
  | "pillarLabel"
  | "service"
  | "videoUrl"
  | "videoThumbnailUrl"
  | "videoDurationText"
  | "imageUrl"
  | "about"
  | "isFavourite"
> & {
    equipment?: Maybe<
      Array<
        { __typename?: "LearnerEquipment" } & Pick<
          LearnerEquipment,
          "id" | "label" | "icon"
        >
      >
    >;
    practitioner: { __typename?: "LearnerPractitioner" } & Pick<
      LearnerPractitioner,
      "id" | "fullName" | "services"
    >;
  };

export type LearnerRecordingsListPartsFragment = {
  __typename?: "LearnerRecordingsList";
} & Pick<LearnerRecordingsList, "id" | "label"> & {
    items: Array<
      { __typename: "LearnerRecording" } & LearnerRecordingCardPartsFragment
    >;
  };

export type LearnerPractitionerCardPartsFragment = {
  __typename?: "LearnerPractitioner";
} & Pick<LearnerPractitioner, "id" | "fullName" | "photoUrl" | "services">;

export type LearnerPractitionerPartsFragment = {
  __typename?: "LearnerPractitioner";
} & Pick<
  LearnerPractitioner,
  "id" | "landscapeImageUrl" | "fullName" | "about" | "isFavourite"
> & {
    accreditation?: Maybe<
      { __typename?: "LearnerPractitionerAccreditation" } & Pick<
        LearnerPractitionerAccreditation,
        "title" | "items"
      >
    >;
    intro?: Maybe<
      { __typename?: "LearnerPractitionerIntro" } & Pick<
        LearnerPractitionerIntro,
        "title" | "textHtml" | "videoUrl" | "videoThumbnailUrl"
      >
    >;
    contentLists: Array<
      | { __typename: "LearnerSessionsList" }
      | ({
          __typename: "LearnerGroupSessionsList";
        } & LearnerGroupSessionsListPartsFragment)
      | { __typename: "LearnerPrivateSessionsList" }
      | ({
          __typename: "LearnerRecordingsList";
        } & LearnerRecordingsListPartsFragment)
    >;
  };

export type LearnerPractitionersListPartsFragment = {
  __typename?: "LearnerPractitionersList";
} & Pick<LearnerPractitionersList, "id" | "label"> & {
    items: Array<
      { __typename: "LearnerPractitioner" } & LearnerPractitionerPartsFragment
    >;
  };

export type LearnerOnboardingPartsFragment = {
  __typename: "LearnerOnboardingForm";
} & {
  intro: { __typename: "IntroScreen" } & Pick<
    IntroScreen,
    "titleHtml" | "subtitleHtml" | "buttonText" | "skipButtonText"
  >;
  inputs: Array<
    | ({ __typename: "SingleInputScreen" } & Pick<
        SingleInputScreen,
        "id" | "titleHtml" | "subtitleHtml" | "buttonText" | "skipButtonText"
      > & {
          input:
            | ({ __typename: "SelectInput" } & Pick<
                SelectInput,
                "id" | "label" | "required"
              > & {
                  options: Array<
                    { __typename: "SelectInputOption" } & Pick<
                      SelectInputOption,
                      "label" | "value"
                    >
                  >;
                })
            | ({ __typename: "MultiSelectInput" } & Pick<
                MultiSelectInput,
                "id" | "required"
              > & {
                  options: Array<
                    { __typename: "SelectInputOption" } & Pick<
                      SelectInputOption,
                      "label" | "value"
                    >
                  >;
                })
            | { __typename: "TextInput" }
            | ({ __typename: "DateInput" } & Pick<
                DateInput,
                "id" | "label" | "required"
              >)
            | ({ __typename: "BooleanInput" } & Pick<
                BooleanInput,
                "id" | "label" | "required" | "reverseLogic"
              >)
            | { __typename: "RangeInput" }
            | { __typename: "ImageInput" };
        })
    | ({ __typename: "MultipleInputsScreen" } & Pick<
        MultipleInputsScreen,
        "id" | "titleHtml" | "subtitleHtml"
      > & {
          inputs: Array<
            | ({ __typename: "SelectInput" } & Pick<
                SelectInput,
                "id" | "label" | "required"
              > & {
                  options: Array<
                    { __typename: "SelectInputOption" } & Pick<
                      SelectInputOption,
                      "label" | "value"
                    >
                  >;
                })
            | ({ __typename: "MultiSelectInput" } & Pick<
                MultiSelectInput,
                "id" | "required"
              > & {
                  options: Array<
                    { __typename: "SelectInputOption" } & Pick<
                      SelectInputOption,
                      "label" | "value"
                    >
                  >;
                })
            | ({ __typename: "TextInput" } & Pick<
                TextInput,
                "id" | "label" | "required" | "minLength" | "maxLength"
              >)
            | ({ __typename: "DateInput" } & Pick<
                DateInput,
                "id" | "label" | "required"
              >)
            | ({ __typename: "BooleanInput" } & Pick<
                BooleanInput,
                "id" | "label" | "required" | "reverseLogic"
              >)
            | { __typename: "RangeInput" }
            | { __typename: "ImageInput" }
          >;
        })
  >;
  animation: Array<
    Maybe<
      { __typename: "ProgressAnimationFrame" } & Pick<
        ProgressAnimationFrame,
        | "percentageStart"
        | "percentageEnd"
        | "transitionDurationSec"
        | "textHtml"
      >
    >
  >;
};

export type LearnerPartsFragment = { __typename?: "Learner" } & Pick<
  Learner,
  "id" | "firstName" | "lastName" | "fullName" | "photoUrl" | "companyName"
>;

export type LearnerQueryVariables = Exact<{
  appInfo: AppInfo;
}>;

export type LearnerQuery = { __typename?: "Query" } & {
  learner: { __typename?: "Learner" } & {
    onboarding?: Maybe<
      { __typename?: "LearnerOnboardingForm" } & LearnerOnboardingPartsFragment
    >;
    biometrics?: Maybe<
      { __typename?: "LearnerBiometrics" } & Pick<
        LearnerBiometrics,
        "vitalUserId"
      > & {
          providers: Array<
            { __typename?: "LearnerBiometricsProvider" } & Pick<
              LearnerBiometricsProvider,
              "id" | "name"
            >
          >;
          modal?: Maybe<
            { __typename?: "LearnerBiometricsModal" } & Pick<
              LearnerBiometricsModal,
              | "title"
              | "contentHtml"
              | "tellMeMoreButtonText"
              | "remindMeLaterButtonText"
              | "dontAskAgainButtonText"
            >
          >;
        }
    >;
  } & LearnerPartsFragment;
};

export type LearnerYouExpandedQueryVariables = Exact<{
  appInfo: AppInfo;
}>;

export type LearnerYouExpandedQuery = { __typename?: "Query" } & {
  learner: { __typename?: "Learner" } & {
    screens: { __typename?: "LearnerScreens" } & {
      you: { __typename?: "LearnerYouScreen" } & {
        welcome: { __typename?: "WelcomeScreen" } & Pick<
          WelcomeScreen,
          "titleHtml" | "subtitleHtml"
        >;
        indexScore?: Maybe<
          { __typename?: "LearnerIndexScore" } & Pick<
            LearnerIndexScore,
            "value" | "valueFloat" | "labelHtml" | "icon"
          >
        >;
        contentLists: Array<
          | ({
              __typename: "LearnerFeaturedSessionList";
            } & LearnerFeaturedSessionsListPartsFragment)
          | ({
              __typename: "LearnerSessionsList";
            } & LearnerSessionsListPartsFragment)
          | ({
              __typename: "LearnerGroupSessionsList";
            } & LearnerGroupSessionsListPartsFragment)
          | { __typename: "LearnerPrivateSessionsList" }
          | ({
              __typename: "LearnerRecordingsList";
            } & LearnerRecordingsListPartsFragment)
          | { __typename: "LearnerFeaturedRecordingList" }
          | { __typename: "LearnerFeaturedArticleList" }
          | ({
              __typename: "LearnerArticlesList";
            } & LearnerArticlesListPartsFragment)
          | ({
              __typename: "LearnerPractitionersList";
            } & LearnerPractitionersListPartsFragment)
        >;
      };
    };
  };
};

export type LearnerScreenYouQueryVariables = Exact<{
  appInfo: AppInfo;
}>;

export type LearnerScreenYouQuery = { __typename?: "Query" } & {
  learner: { __typename?: "Learner" } & {
    screens: { __typename?: "LearnerScreens" } & {
      you: { __typename?: "LearnerYouScreen" } & {
        welcome: { __typename?: "WelcomeScreen" } & Pick<
          WelcomeScreen,
          "titleHtml" | "subtitleHtml"
        >;
        indexScore?: Maybe<
          { __typename?: "LearnerIndexScore" } & Pick<
            LearnerIndexScore,
            "value" | "valueFloat" | "labelHtml" | "icon"
          >
        >;
        contentLists: Array<
          | { __typename: "LearnerFeaturedSessionList" }
          | ({ __typename: "LearnerSessionsList" } & Pick<
              LearnerSessionsList,
              "id" | "label"
            > & {
                items: Array<
                  | ({ __typename: "LearnerGroupSession" } & Pick<
                      LearnerGroupSession,
                      | "id"
                      | "title"
                      | "subtitle"
                      | "pillarLabel"
                      | "service"
                      | "date"
                      | "time"
                      | "timeZone"
                      | "imageUrl"
                    >)
                  | { __typename: "LearnerPrivateSession" }
                >;
              })
          | ({ __typename: "LearnerGroupSessionsList" } & Pick<
              LearnerGroupSessionsList,
              "id" | "label"
            > & {
                items: Array<
                  { __typename: "LearnerGroupSession" } & Pick<
                    LearnerGroupSession,
                    | "id"
                    | "title"
                    | "subtitle"
                    | "pillarLabel"
                    | "service"
                    | "date"
                    | "time"
                    | "timeZone"
                    | "imageUrl"
                  >
                >;
              })
          | { __typename: "LearnerPrivateSessionsList" }
          | ({ __typename: "LearnerRecordingsList" } & Pick<
              LearnerRecordingsList,
              "id" | "label"
            > & {
                items: Array<
                  { __typename: "LearnerRecording" } & Pick<
                    LearnerRecording,
                    | "id"
                    | "title"
                    | "subtitle"
                    | "pillarLabel"
                    | "service"
                    | "videoDurationText"
                  >
                >;
              })
          | { __typename: "LearnerFeaturedRecordingList" }
          | { __typename: "LearnerFeaturedArticleList" }
          | ({ __typename: "LearnerArticlesList" } & Pick<
              LearnerArticlesList,
              "id" | "label"
            > & {
                items: Array<
                  { __typename: "LearnerArticle" } & Pick<
                    LearnerArticle,
                    "id" | "title" | "subtitle" | "imageUrl"
                  >
                >;
              })
          | ({ __typename: "LearnerPractitionersList" } & Pick<
              LearnerPractitionersList,
              "id" | "label"
            > & {
                items: Array<
                  { __typename: "LearnerPractitioner" } & Pick<
                    LearnerPractitioner,
                    "id" | "fullName" | "services"
                  >
                >;
              })
        >;
      };
    };
  };
};

type LearnerSessionCardParts_LearnerGroupSession_Fragment = {
  __typename: "LearnerGroupSession";
} & Pick<
  LearnerGroupSession,
  | "id"
  | "title"
  | "subtitle"
  | "pillarLabel"
  | "service"
  | "duration"
  | "filterTags"
  | "date"
  | "time"
  | "timeZone"
  | "imageUrl"
> & {
    biometrics?: Maybe<
      { __typename?: "LearnerSessionBiometrics" } & {
        heartrateGraph?: Maybe<
          { __typename?: "LearnerSessionBiometricsHeartrateGraph" } & Pick<
            LearnerSessionBiometricsHeartrateGraph,
            | "startValueLabel"
            | "endValueLabel"
            | "diffMessage"
            | "diffValueLabel"
            | "minValue"
            | "maxValue"
            | "stepValue"
            | "values"
            | "minTimeValue"
            | "maxTimeValue"
            | "stepTimeValue"
            | "timeValues"
          >
        >;
      }
    >;
  };

type LearnerSessionCardParts_LearnerPrivateSession_Fragment = {
  __typename: "LearnerPrivateSession";
} & Pick<
  LearnerPrivateSession,
  | "id"
  | "title"
  | "subtitle"
  | "pillarLabel"
  | "service"
  | "duration"
  | "filterTags"
  | "date"
  | "time"
  | "timeZone"
  | "imageUrl"
> & {
    biometrics?: Maybe<
      { __typename?: "LearnerSessionBiometrics" } & {
        heartrateGraph?: Maybe<
          { __typename?: "LearnerSessionBiometricsHeartrateGraph" } & Pick<
            LearnerSessionBiometricsHeartrateGraph,
            | "startValueLabel"
            | "endValueLabel"
            | "diffMessage"
            | "diffValueLabel"
            | "minValue"
            | "maxValue"
            | "stepValue"
            | "values"
            | "minTimeValue"
            | "maxTimeValue"
            | "stepTimeValue"
            | "timeValues"
          >
        >;
      }
    >;
  };

export type LearnerSessionCardPartsFragment =
  | LearnerSessionCardParts_LearnerGroupSession_Fragment
  | LearnerSessionCardParts_LearnerPrivateSession_Fragment;

export type LearnerScreenSessionsOldQueryVariables = Exact<{
  appInfo: AppInfo;
  searchQuery: Scalars["String"];
  filters: LearnerContentListFilters;
}>;

export type LearnerScreenSessionsOldQuery = { __typename?: "Query" } & {
  learner: { __typename?: "Learner" } & {
    screens: { __typename?: "LearnerScreens" } & {
      sessions: { __typename?: "LearnerGroupSessionsScreen" } & Pick<
        LearnerGroupSessionsScreen,
        "title"
      > & {
          landingContentLists: Array<
            | ({ __typename: "LearnerFeaturedSessionList" } & Pick<
                LearnerFeaturedSessionList,
                "id" | "label"
              > & {
                  items: Array<
                    | ({
                        __typename?: "LearnerGroupSession";
                      } & LearnerSessionCardParts_LearnerGroupSession_Fragment)
                    | ({
                        __typename?: "LearnerPrivateSession";
                      } & LearnerSessionCardParts_LearnerPrivateSession_Fragment)
                  >;
                })
            | ({ __typename: "LearnerGroupSessionsList" } & Pick<
                LearnerGroupSessionsList,
                "id" | "label"
              > & {
                  items: Array<
                    {
                      __typename?: "LearnerGroupSession";
                    } & LearnerSessionCardParts_LearnerGroupSession_Fragment
                  >;
                })
          >;
          filteredContentList: {
            __typename: "LearnerGroupSessionsList";
          } & Pick<LearnerGroupSessionsList, "id"> & {
              filters: Array<
                Maybe<
                  { __typename: "MultiSelectInput" } & Pick<
                    MultiSelectInput,
                    "id" | "label"
                  > & {
                      options: Array<
                        { __typename?: "SelectInputOption" } & Pick<
                          SelectInputOption,
                          "value" | "label" | "imageUrl" | "selected"
                        >
                      >;
                    }
                >
              >;
              items: Array<
                {
                  __typename?: "LearnerGroupSession";
                } & LearnerSessionCardParts_LearnerGroupSession_Fragment
              >;
            };
        };
    };
  };
};

export type LearnerScreenSessionsQueryVariables = Exact<{
  appInfo: AppInfo;
  filters: LearnerContentListFilters;
}>;

export type LearnerScreenSessionsQuery = { __typename?: "Query" } & {
  learnerScreenSessions: { __typename?: "LearnerGroupSessionsScreen" } & Pick<
    LearnerGroupSessionsScreen,
    "title"
  > & {
      contentList: { __typename: "LearnerGroupSessionsList" } & Pick<
        LearnerGroupSessionsList,
        "id" | "filterTags" | "services" | "durations"
      > & {
          items: Array<
            {
              __typename?: "LearnerGroupSession";
            } & LearnerSessionCardWebPartsFragment
          >;
        };
    };
};

export type LearnerSessionCardWebPartsFragment = {
  __typename: "LearnerGroupSession";
} & Pick<
  LearnerGroupSession,
  | "id"
  | "title"
  | "subtitle"
  | "pillarLabel"
  | "service"
  | "duration"
  | "filterTags"
  | "date"
  | "time"
  | "timeZone"
  | "imageUrl"
> & {
    buttons: { __typename?: "LearnerGroupSessionActionButtons" } & {
      join?: Maybe<
        { __typename?: "LearnerGroupSessionActionButton" } & Pick<
          LearnerGroupSessionActionButton,
          "style" | "action" | "text"
        >
      >;
      register?: Maybe<
        { __typename?: "LearnerGroupSessionActionButton" } & Pick<
          LearnerGroupSessionActionButton,
          "style" | "action" | "text"
        >
      >;
      unRegister?: Maybe<
        { __typename?: "LearnerGroupSessionActionButton" } & Pick<
          LearnerGroupSessionActionButton,
          "style" | "action" | "text"
        >
      >;
      trackBiometrics?: Maybe<
        { __typename?: "LearnerGroupSessionActionButton" } & Pick<
          LearnerGroupSessionActionButton,
          "style" | "action" | "text"
        >
      >;
    };
    practitioner: { __typename?: "LearnerPractitioner" } & Pick<
      LearnerPractitioner,
      "id" | "firstName" | "fullName"
    >;
    biometrics?: Maybe<
      { __typename?: "LearnerSessionBiometrics" } & {
        heartrateGraph?: Maybe<
          { __typename?: "LearnerSessionBiometricsHeartrateGraph" } & Pick<
            LearnerSessionBiometricsHeartrateGraph,
            | "startValueLabel"
            | "endValueLabel"
            | "diffMessage"
            | "diffValueLabel"
            | "minValue"
            | "maxValue"
            | "stepValue"
            | "values"
            | "minTimeValue"
            | "maxTimeValue"
            | "stepTimeValue"
            | "timeValues"
          >
        >;
      }
    >;
  };

export type LearnerScreenScheduleQueryVariables = Exact<{
  appInfo: AppInfo;
}>;

export type LearnerScreenScheduleQuery = { __typename?: "Query" } & {
  learner: { __typename?: "Learner" } & {
    screens: { __typename?: "LearnerScreens" } & {
      schedule: { __typename?: "LearnerScheduleScreen" } & Pick<
        LearnerScheduleScreen,
        "title"
      > & {
          contentLists: Array<
            { __typename: "LearnerSessionsList" } & Pick<
              LearnerSessionsList,
              "id" | "label" | "filterTags" | "services" | "durations"
            > & {
                items: Array<
                  | ({
                      __typename?: "LearnerGroupSession";
                    } & LearnerSessionCardParts_LearnerGroupSession_Fragment)
                  | ({
                      __typename?: "LearnerPrivateSession";
                    } & LearnerSessionCardParts_LearnerPrivateSession_Fragment)
                >;
              }
          >;
        };
    };
  };
};

export type LearnerArticleCardPartsFragment = {
  __typename?: "LearnerArticle";
} & Pick<
  LearnerArticle,
  "id" | "title" | "subtitle" | "imageUrl" | "readTime" | "pillarLabel"
>;

export type LearnerScreenArticlesQueryVariables = Exact<{
  appInfo: AppInfo;
  searchQuery: Scalars["String"];
  filters: LearnerContentListFilters;
}>;

export type LearnerScreenArticlesQuery = { __typename?: "Query" } & {
  learner: { __typename?: "Learner" } & {
    screens: { __typename?: "LearnerScreens" } & {
      articles: { __typename?: "LearnerArticlesScreen" } & Pick<
        LearnerArticlesScreen,
        "title"
      > & {
          landingContentLists: Array<
            | ({ __typename: "LearnerFeaturedArticleList" } & Pick<
                LearnerFeaturedArticleList,
                "id" | "label"
              > & {
                  items: Array<
                    {
                      __typename?: "LearnerArticle";
                    } & LearnerArticleCardPartsFragment
                  >;
                })
            | ({ __typename: "LearnerArticlesList" } & Pick<
                LearnerArticlesList,
                "id" | "label"
              > & {
                  items: Array<
                    {
                      __typename?: "LearnerArticle";
                    } & LearnerArticleCardPartsFragment
                  >;
                })
          >;
          filteredContentList: { __typename: "LearnerArticlesList" } & Pick<
            LearnerArticlesList,
            "id"
          > & {
              filters: Array<
                Maybe<
                  { __typename?: "MultiSelectInput" } & Pick<
                    MultiSelectInput,
                    "id" | "label"
                  > & {
                      options: Array<
                        { __typename?: "SelectInputOption" } & Pick<
                          SelectInputOption,
                          "value" | "label" | "imageUrl" | "selected"
                        >
                      >;
                    }
                >
              >;
              items: Array<
                {
                  __typename?: "LearnerArticle";
                } & LearnerArticleCardPartsFragment
              >;
            };
        };
    };
  };
};

export type LearnerRecordingCardPartsFragment = {
  __typename?: "LearnerRecording";
} & Pick<
  LearnerRecording,
  | "id"
  | "title"
  | "subtitle"
  | "pillarLabel"
  | "service"
  | "videoDurationText"
  | "imageUrl"
>;

export type LearnerScreenRecordingsQueryVariables = Exact<{
  appInfo: AppInfo;
  searchQuery: Scalars["String"];
  filters: LearnerContentListFilters;
}>;

export type LearnerScreenRecordingsQuery = { __typename?: "Query" } & {
  learner: { __typename?: "Learner" } & {
    screens: { __typename?: "LearnerScreens" } & {
      recordings: { __typename?: "LearnerRecordingsScreen" } & Pick<
        LearnerRecordingsScreen,
        "title"
      > & {
          landingContentLists: Array<
            | ({ __typename: "LearnerFeaturedRecordingList" } & Pick<
                LearnerFeaturedRecordingList,
                "id" | "label"
              > & {
                  items: Array<
                    {
                      __typename?: "LearnerRecording";
                    } & LearnerRecordingCardPartsFragment
                  >;
                })
            | ({ __typename: "LearnerRecordingsList" } & Pick<
                LearnerRecordingsList,
                "id" | "label"
              > & {
                  items: Array<
                    {
                      __typename?: "LearnerRecording";
                    } & LearnerRecordingCardPartsFragment
                  >;
                })
          >;
          filteredContentList: { __typename: "LearnerRecordingsList" } & Pick<
            LearnerRecordingsList,
            "id"
          > & {
              filters: Array<
                Maybe<
                  { __typename?: "MultiSelectInput" } & Pick<
                    MultiSelectInput,
                    "id" | "label"
                  > & {
                      options: Array<
                        { __typename?: "SelectInputOption" } & Pick<
                          SelectInputOption,
                          "value" | "label" | "imageUrl" | "selected"
                        >
                      >;
                    }
                >
              >;
              items: Array<
                {
                  __typename?: "LearnerRecording";
                } & LearnerRecordingCardPartsFragment
              >;
            };
        };
    };
  };
};

export type LearnerScreenFavouritesQueryVariables = Exact<{
  appInfo: AppInfo;
}>;

export type LearnerScreenFavouritesQuery = { __typename?: "Query" } & {
  learner: { __typename?: "Learner" } & {
    screens: { __typename?: "LearnerScreens" } & {
      favourites: { __typename?: "LearnerFavouritesScreen" } & Pick<
        LearnerFavouritesScreen,
        "title"
      > & {
          recordingsList: { __typename: "LearnerRecordingsList" } & Pick<
            LearnerRecordingsList,
            "id" | "label"
          > & {
              items: Array<
                {
                  __typename?: "LearnerRecording";
                } & LearnerRecordingCardPartsFragment
              >;
            };
          articlesList: { __typename?: "LearnerArticlesList" } & Pick<
            LearnerArticlesList,
            "id" | "label"
          > & {
              items: Array<
                {
                  __typename?: "LearnerArticle";
                } & LearnerArticleCardPartsFragment
              >;
            };
        };
    };
  };
};

export type LearnerIndexBreakdownPillarPartsFragment = {
  __typename?: "LearnerIndexBreakdownPillar";
} & Pick<
  LearnerIndexBreakdownPillar,
  "pillarLabel" | "title" | "subtitle" | "descriptionHtml"
> & {
    score: { __typename?: "LearnerIndexScore" } & Pick<
      LearnerIndexScore,
      "value" | "valueFloat" | "labelHtml" | "icon"
    >;
    contentLists: Array<
      { __typename: "LearnerIndexBreakdownPillarContentList" } & Pick<
        LearnerIndexBreakdownPillarContentList,
        "id" | "label"
      > & {
          items: Array<
            | ({
                __typename: "LearnerGroupSession";
              } & LearnerSessionCardParts_LearnerGroupSession_Fragment)
            | ({
                __typename: "LearnerRecording";
              } & LearnerRecordingCardPartsFragment)
            | ({
                __typename: "LearnerArticle";
              } & LearnerArticleCardPartsFragment)
          >;
        }
    >;
  };

export type LearnerScreenIndexQueryVariables = Exact<{
  appInfo: AppInfo;
}>;

export type LearnerScreenIndexQuery = { __typename?: "Query" } & {
  learner: { __typename?: "Learner" } & {
    screens: { __typename?: "LearnerScreens" } & {
      index: { __typename?: "LearnerIndexScreen" } & {
        score?: Maybe<
          { __typename?: "LearnerIndexScore" } & Pick<
            LearnerIndexScore,
            "value" | "valueFloat" | "labelHtml" | "icon"
          >
        >;
        coach?: Maybe<
          { __typename?: "LearnerIndexCoach" } & Pick<
            LearnerIndexCoach,
            "name" | "avatarUrl" | "messageTextHtml"
          > & {
              externalAssessmentButton?: Maybe<
                { __typename?: "ExternalAssessmentButton" } & Pick<
                  ExternalAssessmentButton,
                  "text" | "url"
                >
              >;
            }
        >;
        breakdown?: Maybe<
          { __typename?: "LearnerIndexBreakdown" } & {
            energy: {
              __typename?: "LearnerIndexBreakdownPillar";
            } & LearnerIndexBreakdownPillarPartsFragment;
            resilience: {
              __typename?: "LearnerIndexBreakdownPillar";
            } & LearnerIndexBreakdownPillarPartsFragment;
            activity: {
              __typename?: "LearnerIndexBreakdownPillar";
            } & LearnerIndexBreakdownPillarPartsFragment;
          }
        >;
        progress?: Maybe<
          { __typename?: "LearnerIndexProgress" } & Pick<
            LearnerIndexProgress,
            "title" | "labels" | "minValue" | "maxValue"
          > & {
              energyData: { __typename?: "LearnerIndexProgressData" } & Pick<
                LearnerIndexProgressData,
                "label" | "values"
              >;
              resilienceData: {
                __typename?: "LearnerIndexProgressData";
              } & Pick<LearnerIndexProgressData, "label" | "values">;
              activityData: { __typename?: "LearnerIndexProgressData" } & Pick<
                LearnerIndexProgressData,
                "label" | "values"
              >;
            }
        >;
        biometrics?: Maybe<
          { __typename?: "LearnerIndexBiometrics" } & {
            sessionsHistory: {
              __typename?: "LearnerIndexBiometricsSessionsHistory";
            } & Pick<
              LearnerIndexBiometricsSessionsHistory,
              | "state"
              | "callToActionTitle"
              | "callToActionContentHtml"
              | "callToActionButtonText"
            > & {
                contentList: { __typename: "LearnerGroupSessionsList" } & Pick<
                  LearnerGroupSessionsList,
                  "id" | "label"
                > & {
                    items: Array<
                      {
                        __typename?: "LearnerGroupSession";
                      } & LearnerSessionCardParts_LearnerGroupSession_Fragment
                    >;
                  };
              };
          }
        >;
      };
    };
  };
};

export type LearnerScreenContentQueryVariables = Exact<{
  appInfo: AppInfo;
}>;

export type LearnerScreenContentQuery = { __typename?: "Query" } & {
  learner: { __typename?: "Learner" } & {
    screens: { __typename?: "LearnerScreens" } & {
      content: { __typename?: "LearnerContentScreen" } & {
        contentLists: Array<
          Maybe<
            | { __typename: "LearnerFeaturedSessionList" }
            | { __typename: "LearnerSessionsList" }
            | { __typename: "LearnerGroupSessionsList" }
            | { __typename: "LearnerPrivateSessionsList" }
            | ({ __typename: "LearnerRecordingsList" } & Pick<
                LearnerRecordingsList,
                "id" | "label"
              > & {
                  items: Array<
                    {
                      __typename: "LearnerRecording";
                    } & LearnerRecordingCardPartsFragment
                  >;
                })
            | ({ __typename: "LearnerFeaturedRecordingList" } & Pick<
                LearnerFeaturedRecordingList,
                "id" | "label"
              > & {
                  items: Array<
                    {
                      __typename: "LearnerRecording";
                    } & LearnerRecordingCardPartsFragment
                  >;
                })
            | { __typename: "LearnerFeaturedArticleList" }
            | ({ __typename: "LearnerArticlesList" } & Pick<
                LearnerArticlesList,
                "id" | "label"
              > & {
                  items: Array<
                    {
                      __typename: "LearnerArticle";
                    } & LearnerArticleCardPartsFragment
                  >;
                })
            | { __typename: "LearnerPractitionersList" }
          >
        >;
      };
    };
  };
};

export type LearnerScreenProfileQueryVariables = Exact<{
  appInfo: AppInfo;
}>;

export type LearnerScreenProfileQuery = { __typename?: "Query" } & {
  learner: { __typename?: "Learner" } & Pick<
    Learner,
    "firstName" | "lastName" | "fullName" | "photoUrl"
  > & {
      biometrics?: Maybe<
        { __typename?: "LearnerBiometrics" } & Pick<
          LearnerBiometrics,
          "hasHealthData"
        >
      >;
      screens: { __typename?: "LearnerScreens" } & {
        profile: { __typename?: "LearnerProfileScreen" } & {
          journey: { __typename?: "LearnerJourney" } & Pick<
            LearnerJourney,
            "title" | "memberSince"
          > & {
              timeInvested?: Maybe<
                { __typename?: "LearnerJourneyTimeInvested" } & Pick<
                  LearnerJourneyTimeInvested,
                  "value" | "label" | "metric"
                >
              >;
              sessionsAttended?: Maybe<
                { __typename?: "LearnerJourneySessionsAttended" } & Pick<
                  LearnerJourneySessionsAttended,
                  "value" | "label"
                >
              >;
            };
          favourites?: Maybe<
            { __typename?: "LearnerFavourites" } & Pick<
              LearnerFavourites,
              "title"
            > & {
                recordings: {
                  __typename?: "LearnerFavouritesRecordings";
                } & Pick<LearnerFavouritesRecordings, "count" | "label"> & {
                    contentList: { __typename: "LearnerRecordingsList" } & Pick<
                      LearnerRecordingsList,
                      "id"
                    >;
                  };
                articles: { __typename?: "LearnerFavouritesArticles" } & Pick<
                  LearnerFavouritesArticles,
                  "count" | "label"
                > & {
                    contentList: { __typename: "LearnerArticlesList" } & Pick<
                      LearnerArticlesList,
                      "id"
                    >;
                  };
              }
          >;
          settings?: Maybe<
            { __typename?: "LearnerSettings" } & Pick<
              LearnerSettings,
              "title"
            > & {
                profile: {
                  __typename?: "LearnerProfileSettings";
                } & LearnerProfileSettingsPartsFragment;
                notifications: {
                  __typename?: "LearnerNotificationsSettings";
                } & Pick<LearnerNotificationsSettings, "title"> & {
                    toggles: Array<
                      {
                        __typename?: "BooleanInput";
                      } & BooleanInputPartsFragment
                    >;
                  };
                calendar: { __typename?: "LearnerCalendarSettings" } & Pick<
                  LearnerCalendarSettings,
                  "title"
                > & {
                    toggles: Array<
                      {
                        __typename?: "BooleanInput";
                      } & BooleanInputPartsFragment
                    >;
                  };
                ourMission: { __typename?: "LearnerOurMission" } & Pick<
                  LearnerOurMission,
                  "title" | "heading" | "imageUrl" | "contentHtml"
                >;
                membership: { __typename?: "LearnerMembership" } & Pick<
                  LearnerMembership,
                  "title" | "type"
                > & {
                    advantages: {
                      __typename?: "LearnerMembershipAdvantages";
                    } & Pick<LearnerMembershipAdvantages, "heading"> & {
                        items: Array<
                          { __typename?: "LearnerMembershipAdvantage" } & Pick<
                            LearnerMembershipAdvantage,
                            "name" | "description"
                          >
                        >;
                      };
                  };
                biometrics?: Maybe<
                  { __typename?: "LearnerBiometricsSettings" } & {
                    providers: {
                      __typename?: "LearnerBiometricsProviders";
                    } & Pick<LearnerBiometricsProviders, "title"> & {
                        providers: Array<
                          { __typename?: "LearnerBiometricsProvider" } & Pick<
                            LearnerBiometricsProvider,
                            "id" | "name"
                          >
                        >;
                      };
                    howItWorks: {
                      __typename?: "LearnerBiometricsHowItWorks";
                    } & Pick<
                      LearnerBiometricsHowItWorks,
                      "title" | "headingTitle" | "headingContentHtml"
                    > & {
                        callToAction?: Maybe<
                          {
                            __typename?: "LearnerBiometricsHowItWorksCallToAction";
                          } & Pick<
                            LearnerBiometricsHowItWorksCallToAction,
                            "title" | "buttonText"
                          >
                        >;
                        sections: Array<
                          {
                            __typename?: "LearnerBiometricsHowItWorksSection";
                          } & Pick<
                            LearnerBiometricsHowItWorksSection,
                            "title"
                          > & {
                              items: Array<
                                {
                                  __typename?: "LearnerBiometricsHowItWorksSectionItem";
                                } & Pick<
                                  LearnerBiometricsHowItWorksSectionItem,
                                  "title" | "contentHtml"
                                >
                              >;
                            }
                        >;
                      };
                  }
                >;
              }
          >;
          contentLists: Array<
            { __typename: "LearnerGroupSessionsList" } & Pick<
              LearnerGroupSessionsList,
              "id" | "label"
            > & {
                items: Array<
                  {
                    __typename?: "LearnerGroupSession";
                  } & LearnerSessionCardParts_LearnerGroupSession_Fragment
                >;
              }
          >;
        };
      };
    };
};

type InputParts_SelectInput_Fragment = {
  __typename?: "SelectInput";
} & SelectInputPartsFragment;

type InputParts_MultiSelectInput_Fragment = {
  __typename?: "MultiSelectInput";
} & MultiSelectInputPartsFragment;

type InputParts_TextInput_Fragment = {
  __typename?: "TextInput";
} & TextInputPartsFragment;

type InputParts_DateInput_Fragment = {
  __typename?: "DateInput";
} & DateInputPartsFragment;

type InputParts_BooleanInput_Fragment = {
  __typename?: "BooleanInput";
} & BooleanInputPartsFragment;

type InputParts_RangeInput_Fragment = {
  __typename?: "RangeInput";
} & RangeInputPartsFragment;

type InputParts_ImageInput_Fragment = {
  __typename?: "ImageInput";
} & ImageInputPartsFragment;

export type InputPartsFragment =
  | InputParts_SelectInput_Fragment
  | InputParts_MultiSelectInput_Fragment
  | InputParts_TextInput_Fragment
  | InputParts_DateInput_Fragment
  | InputParts_BooleanInput_Fragment
  | InputParts_RangeInput_Fragment
  | InputParts_ImageInput_Fragment;

export type SelectInputPartsFragment = { __typename?: "SelectInput" } & Pick<
  SelectInput,
  "id" | "label" | "required"
> & {
    options: Array<
      { __typename?: "SelectInputOption" } & Pick<
        SelectInputOption,
        "label" | "value" | "imageUrl" | "selected"
      >
    >;
  };

export type MultiSelectInputPartsFragment = {
  __typename?: "MultiSelectInput";
} & Pick<MultiSelectInput, "id" | "label" | "required"> & {
    options: Array<
      { __typename?: "SelectInputOption" } & Pick<
        SelectInputOption,
        "label" | "value" | "imageUrl" | "selected"
      >
    >;
  };

export type BooleanInputPartsFragment = { __typename?: "BooleanInput" } & Pick<
  BooleanInput,
  "id" | "label" | "required" | "reverseLogic" | "checked"
>;

export type DateInputPartsFragment = { __typename?: "DateInput" } & Pick<
  DateInput,
  "id" | "label" | "required" | "minDate" | "maxDate" | "value"
>;

export type ImageInputPartsFragment = { __typename?: "ImageInput" } & Pick<
  ImageInput,
  "id" | "label" | "required" | "value"
>;

export type TextInputPartsFragment = { __typename?: "TextInput" } & Pick<
  TextInput,
  | "id"
  | "label"
  | "required"
  | "minLength"
  | "maxLength"
  | "placeholder"
  | "value"
>;

export type RangeInputPartsFragment = { __typename?: "RangeInput" } & Pick<
  RangeInput,
  | "id"
  | "label"
  | "required"
  | "min"
  | "minLabel"
  | "max"
  | "maxLabel"
  | "step"
  | "value"
>;

export type LearnerJoinGroupSessionMutationVariables = Exact<{
  id: Scalars["ID"];
  appInfo: AppInfo;
}>;

export type LearnerJoinGroupSessionMutation = { __typename?: "Mutation" } & {
  learnerJoinGroupSession?: Maybe<
    { __typename?: "LearnerJoinGroupSession" } & Pick<
      LearnerJoinGroupSession,
      "ok" | "zoomMtgNumber" | "zoomMtgPassWord" | "zoomMtgSignature"
    > & {
        learnerBeforeJoiningGroupSessionFeedbackForm: {
          __typename?: "LearnerBeforeJoiningGroupSessionFeedbackForm";
        } & Pick<
          LearnerBeforeJoiningGroupSessionFeedbackForm,
          "title" | "buttonText"
        > & {
            messages: Array<
              Maybe<
                { __typename?: "Message" } & Pick<
                  Message,
                  "senderAvatarUrl" | "senderName" | "textHtml"
                > & {
                    input?: Maybe<
                      | ({
                          __typename?: "SelectInput";
                        } & InputParts_SelectInput_Fragment)
                      | ({
                          __typename?: "MultiSelectInput";
                        } & InputParts_MultiSelectInput_Fragment)
                      | ({
                          __typename?: "TextInput";
                        } & InputParts_TextInput_Fragment)
                      | ({
                          __typename?: "DateInput";
                        } & InputParts_DateInput_Fragment)
                      | ({
                          __typename?: "BooleanInput";
                        } & InputParts_BooleanInput_Fragment)
                      | ({
                          __typename?: "RangeInput";
                        } & InputParts_RangeInput_Fragment)
                      | ({
                          __typename?: "ImageInput";
                        } & InputParts_ImageInput_Fragment)
                    >;
                  }
              >
            >;
          };
      }
  >;
};

export type LearnerRegisterForGroupSessionMutationVariables = Exact<{
  id: Scalars["ID"];
  appInfo: AppInfo;
}>;

export type LearnerRegisterForGroupSessionMutation = {
  __typename?: "Mutation";
} & {
  learnerRegisterForGroupSession?: Maybe<
    { __typename?: "LearnerRegisterForGroupSession" } & Pick<
      LearnerRegisterForGroupSession,
      "ok"
    > & {
        learnerGroupSession: {
          __typename?: "LearnerGroupSession";
        } & LearnerGroupSessionPartsFragment;
      }
  >;
};

export type LearnerUnRegisterForGroupSessionMutationVariables = Exact<{
  id: Scalars["ID"];
  appInfo: AppInfo;
}>;

export type LearnerUnRegisterForGroupSessionMutation = {
  __typename?: "Mutation";
} & {
  learnerUnRegisterForGroupSession?: Maybe<
    { __typename?: "LearnerUnRegisterForGroupSession" } & Pick<
      LearnerUnRegisterForGroupSession,
      "ok"
    > & {
        learnerGroupSession: {
          __typename?: "LearnerGroupSession";
        } & LearnerGroupSessionPartsFragment;
      }
  >;
};

export type LearnerTrackBiometricsMutationVariables = Exact<{
  appInfo: AppInfo;
}>;

export type LearnerTrackBiometricsMutation = { __typename?: "Mutation" } & {
  learnerTrackBiometrics?: Maybe<
    { __typename?: "LearnerTrackBiometrics" } & Pick<
      LearnerTrackBiometrics,
      "ok"
    > & {
        learner: { __typename?: "Learner" } & {
          biometrics?: Maybe<
            { __typename?: "LearnerBiometrics" } & {
              modal?: Maybe<
                { __typename?: "LearnerBiometricsModal" } & Pick<
                  LearnerBiometricsModal,
                  | "title"
                  | "contentHtml"
                  | "remindMeLaterButtonText"
                  | "dontAskAgainButtonText"
                >
              >;
            }
          >;
        };
      }
  >;
};

export type LearnerAfterLeavingGroupSessionFeedbackFormQueryVariables = Exact<{
  groupSessionId: Scalars["ID"];
  appInfo: AppInfo;
}>;

export type LearnerAfterLeavingGroupSessionFeedbackFormQuery = {
  __typename?: "Query";
} & {
  learnerAfterLeavingGroupSessionFeedbackForm: {
    __typename?: "LearnerAfterLeavingGroupSessionFeedbackForm";
  } & Pick<
    LearnerAfterLeavingGroupSessionFeedbackForm,
    "title" | "buttonText"
  > & {
      messages: Array<
        Maybe<
          { __typename?: "Message" } & Pick<
            Message,
            "senderAvatarUrl" | "senderName" | "textHtml"
          > & {
              input?: Maybe<
                | ({
                    __typename?: "SelectInput";
                  } & InputParts_SelectInput_Fragment)
                | ({
                    __typename?: "MultiSelectInput";
                  } & InputParts_MultiSelectInput_Fragment)
                | ({ __typename?: "TextInput" } & InputParts_TextInput_Fragment)
                | ({ __typename?: "DateInput" } & InputParts_DateInput_Fragment)
                | ({
                    __typename?: "BooleanInput";
                  } & InputParts_BooleanInput_Fragment)
                | ({
                    __typename?: "RangeInput";
                  } & InputParts_RangeInput_Fragment)
                | ({
                    __typename?: "ImageInput";
                  } & InputParts_ImageInput_Fragment)
              >;
            }
        >
      >;
    };
};

export type LearnerOnboardingMutationVariables = Exact<{
  appInfo: AppInfo;
  input: LearnerOnboardingInput;
}>;

export type LearnerOnboardingMutation = { __typename?: "Mutation" } & {
  learnerOnboarding?: Maybe<
    { __typename?: "LearnerOnboarding" } & Pick<LearnerOnboarding, "ok"> & {
        learner: { __typename?: "Learner" } & LearnerPartsFragment;
        welcomeScreen: { __typename?: "WelcomeScreen" } & Pick<
          WelcomeScreen,
          "titleHtml" | "subtitleHtml" | "buttonText"
        >;
      }
  >;
};

export type LearnerSessionQueryVariables = Exact<{
  id: Scalars["ID"];
  appInfo: AppInfo;
}>;

export type LearnerSessionQuery = { __typename?: "Query" } & {
  learnerSession:
    | ({ __typename: "LearnerGroupSession" } & LearnerGroupSessionPartsFragment)
    | { __typename: "LearnerPrivateSession" };
};

export type LearnerRecordingQueryVariables = Exact<{
  id: Scalars["ID"];
  appInfo: AppInfo;
}>;

export type LearnerRecordingQuery = { __typename?: "Query" } & {
  learnerRecording: {
    __typename: "LearnerRecording";
  } & LearnerRecordingPartsFragment;
};

export type LearnerArticleQueryVariables = Exact<{
  id: Scalars["ID"];
  appInfo: AppInfo;
}>;

export type LearnerArticleQuery = { __typename?: "Query" } & {
  learnerArticle: {
    __typename: "LearnerArticle";
  } & LearnerArticlePartsFragment;
};

export type LearnerPractitionerQueryVariables = Exact<{
  id: Scalars["ID"];
  appInfo: AppInfo;
}>;

export type LearnerPractitionerQuery = { __typename?: "Query" } & {
  learnerPractitioner: {
    __typename: "LearnerPractitioner";
  } & LearnerPractitionerPartsFragment;
};

export type LearnerContentListQueryVariables = Exact<{
  id: Scalars["ID"];
  searchQuery: Scalars["String"];
  filters: LearnerContentListFilters;
  appInfo: AppInfo;
  first?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type LearnerContentListQuery = { __typename?: "Query" } & {
  learnerContentList:
    | ({ __typename: "LearnerFeaturedSessionList" } & {
        items: Array<
          | ({
              __typename: "LearnerGroupSession";
            } & LearnerSessionCardParts_LearnerGroupSession_Fragment)
          | ({
              __typename: "LearnerPrivateSession";
            } & LearnerSessionCardParts_LearnerPrivateSession_Fragment)
        >;
      } & LearnerContentListParts_LearnerFeaturedSessionList_Fragment)
    | ({ __typename: "LearnerSessionsList" } & {
        items: Array<
          | ({
              __typename: "LearnerGroupSession";
            } & LearnerSessionCardParts_LearnerGroupSession_Fragment)
          | ({
              __typename: "LearnerPrivateSession";
            } & LearnerSessionCardParts_LearnerPrivateSession_Fragment)
        >;
      } & LearnerContentListParts_LearnerSessionsList_Fragment)
    | ({ __typename: "LearnerGroupSessionsList" } & {
        items: Array<
          {
            __typename: "LearnerGroupSession";
          } & LearnerSessionCardParts_LearnerGroupSession_Fragment
        >;
      } & LearnerContentListParts_LearnerGroupSessionsList_Fragment)
    | ({
        __typename: "LearnerPrivateSessionsList";
      } & LearnerContentListParts_LearnerPrivateSessionsList_Fragment)
    | ({ __typename: "LearnerRecordingsList" } & {
        items: Array<
          { __typename: "LearnerRecording" } & LearnerRecordingCardPartsFragment
        >;
      } & LearnerContentListParts_LearnerRecordingsList_Fragment)
    | ({ __typename: "LearnerFeaturedRecordingList" } & {
        items: Array<
          { __typename: "LearnerRecording" } & LearnerRecordingCardPartsFragment
        >;
      } & LearnerContentListParts_LearnerFeaturedRecordingList_Fragment)
    | ({ __typename: "LearnerFeaturedArticleList" } & {
        items: Array<
          { __typename: "LearnerArticle" } & LearnerArticleCardPartsFragment
        >;
      } & LearnerContentListParts_LearnerFeaturedArticleList_Fragment)
    | ({ __typename: "LearnerArticlesList" } & {
        items: Array<
          { __typename: "LearnerArticle" } & LearnerArticleCardPartsFragment
        >;
      } & LearnerContentListParts_LearnerArticlesList_Fragment)
    | ({ __typename: "LearnerPractitionersList" } & {
        items: Array<
          {
            __typename: "LearnerPractitioner";
          } & LearnerPractitionerCardPartsFragment
        >;
      } & LearnerContentListParts_LearnerPractitionersList_Fragment);
};

type LearnerContentListParts_LearnerArticlesList_Fragment = {
  __typename?: "LearnerArticlesList";
} & Pick<
  LearnerArticlesList,
  "id" | "label" | "filterTags" | "services" | "durations"
> & {
    filters: Array<
      Maybe<
        { __typename: "MultiSelectInput" } & Pick<
          MultiSelectInput,
          "id" | "label"
        > & {
            options: Array<
              { __typename?: "SelectInputOption" } & Pick<
                SelectInputOption,
                "value" | "label" | "imageUrl" | "selected"
              >
            >;
          }
      >
    >;
  };

type LearnerContentListParts_LearnerFeaturedArticleList_Fragment = {
  __typename?: "LearnerFeaturedArticleList";
} & Pick<
  LearnerFeaturedArticleList,
  "id" | "label" | "filterTags" | "services" | "durations"
> & {
    filters: Array<
      Maybe<
        { __typename: "MultiSelectInput" } & Pick<
          MultiSelectInput,
          "id" | "label"
        > & {
            options: Array<
              { __typename?: "SelectInputOption" } & Pick<
                SelectInputOption,
                "value" | "label" | "imageUrl" | "selected"
              >
            >;
          }
      >
    >;
  };

type LearnerContentListParts_LearnerFeaturedRecordingList_Fragment = {
  __typename?: "LearnerFeaturedRecordingList";
} & Pick<
  LearnerFeaturedRecordingList,
  "id" | "label" | "filterTags" | "services" | "durations"
> & {
    filters: Array<
      Maybe<
        { __typename: "MultiSelectInput" } & Pick<
          MultiSelectInput,
          "id" | "label"
        > & {
            options: Array<
              { __typename?: "SelectInputOption" } & Pick<
                SelectInputOption,
                "value" | "label" | "imageUrl" | "selected"
              >
            >;
          }
      >
    >;
  };

type LearnerContentListParts_LearnerFeaturedSessionList_Fragment = {
  __typename?: "LearnerFeaturedSessionList";
} & Pick<
  LearnerFeaturedSessionList,
  "id" | "label" | "filterTags" | "services" | "durations"
> & {
    filters: Array<
      Maybe<
        { __typename: "MultiSelectInput" } & Pick<
          MultiSelectInput,
          "id" | "label"
        > & {
            options: Array<
              { __typename?: "SelectInputOption" } & Pick<
                SelectInputOption,
                "value" | "label" | "imageUrl" | "selected"
              >
            >;
          }
      >
    >;
  };

type LearnerContentListParts_LearnerGroupSessionsList_Fragment = {
  __typename?: "LearnerGroupSessionsList";
} & Pick<
  LearnerGroupSessionsList,
  "id" | "label" | "filterTags" | "services" | "durations"
> & {
    filters: Array<
      Maybe<
        { __typename: "MultiSelectInput" } & Pick<
          MultiSelectInput,
          "id" | "label"
        > & {
            options: Array<
              { __typename?: "SelectInputOption" } & Pick<
                SelectInputOption,
                "value" | "label" | "imageUrl" | "selected"
              >
            >;
          }
      >
    >;
  };

type LearnerContentListParts_LearnerIndexBreakdownPillarContentList_Fragment = {
  __typename?: "LearnerIndexBreakdownPillarContentList";
} & Pick<
  LearnerIndexBreakdownPillarContentList,
  "id" | "label" | "filterTags" | "services" | "durations"
> & {
    filters: Array<
      Maybe<
        { __typename: "MultiSelectInput" } & Pick<
          MultiSelectInput,
          "id" | "label"
        > & {
            options: Array<
              { __typename?: "SelectInputOption" } & Pick<
                SelectInputOption,
                "value" | "label" | "imageUrl" | "selected"
              >
            >;
          }
      >
    >;
  };

type LearnerContentListParts_LearnerPractitionersList_Fragment = {
  __typename?: "LearnerPractitionersList";
} & Pick<
  LearnerPractitionersList,
  "id" | "label" | "filterTags" | "services" | "durations"
> & {
    filters: Array<
      Maybe<
        { __typename: "MultiSelectInput" } & Pick<
          MultiSelectInput,
          "id" | "label"
        > & {
            options: Array<
              { __typename?: "SelectInputOption" } & Pick<
                SelectInputOption,
                "value" | "label" | "imageUrl" | "selected"
              >
            >;
          }
      >
    >;
  };

type LearnerContentListParts_LearnerPrivateSessionsList_Fragment = {
  __typename?: "LearnerPrivateSessionsList";
} & Pick<
  LearnerPrivateSessionsList,
  "id" | "label" | "filterTags" | "services" | "durations"
> & {
    filters: Array<
      Maybe<
        { __typename: "MultiSelectInput" } & Pick<
          MultiSelectInput,
          "id" | "label"
        > & {
            options: Array<
              { __typename?: "SelectInputOption" } & Pick<
                SelectInputOption,
                "value" | "label" | "imageUrl" | "selected"
              >
            >;
          }
      >
    >;
  };

type LearnerContentListParts_LearnerRecordingsList_Fragment = {
  __typename?: "LearnerRecordingsList";
} & Pick<
  LearnerRecordingsList,
  "id" | "label" | "filterTags" | "services" | "durations"
> & {
    filters: Array<
      Maybe<
        { __typename: "MultiSelectInput" } & Pick<
          MultiSelectInput,
          "id" | "label"
        > & {
            options: Array<
              { __typename?: "SelectInputOption" } & Pick<
                SelectInputOption,
                "value" | "label" | "imageUrl" | "selected"
              >
            >;
          }
      >
    >;
  };

type LearnerContentListParts_LearnerSessionsList_Fragment = {
  __typename?: "LearnerSessionsList";
} & Pick<
  LearnerSessionsList,
  "id" | "label" | "filterTags" | "services" | "durations"
> & {
    filters: Array<
      Maybe<
        { __typename: "MultiSelectInput" } & Pick<
          MultiSelectInput,
          "id" | "label"
        > & {
            options: Array<
              { __typename?: "SelectInputOption" } & Pick<
                SelectInputOption,
                "value" | "label" | "imageUrl" | "selected"
              >
            >;
          }
      >
    >;
  };

export type LearnerContentListPartsFragment =
  | LearnerContentListParts_LearnerArticlesList_Fragment
  | LearnerContentListParts_LearnerFeaturedArticleList_Fragment
  | LearnerContentListParts_LearnerFeaturedRecordingList_Fragment
  | LearnerContentListParts_LearnerFeaturedSessionList_Fragment
  | LearnerContentListParts_LearnerGroupSessionsList_Fragment
  | LearnerContentListParts_LearnerIndexBreakdownPillarContentList_Fragment
  | LearnerContentListParts_LearnerPractitionersList_Fragment
  | LearnerContentListParts_LearnerPrivateSessionsList_Fragment
  | LearnerContentListParts_LearnerRecordingsList_Fragment
  | LearnerContentListParts_LearnerSessionsList_Fragment;

export type LearnerFavouriteMutationVariables = Exact<{
  id: Scalars["ID"];
  typename: Scalars["String"];
  appInfo: AppInfo;
}>;

export type LearnerFavouriteMutation = { __typename?: "Mutation" } & {
  learnerFavourite?: Maybe<
    { __typename?: "LearnerFavourite" } & Pick<LearnerFavourite, "ok"> & {
        item:
          | ({ __typename: "LearnerRecording" } & LearnerRecordingPartsFragment)
          | ({ __typename: "LearnerArticle" } & LearnerArticlePartsFragment)
          | ({
              __typename: "LearnerPractitioner";
            } & LearnerPractitionerPartsFragment);
      }
  >;
};

export type LearnerUnFavouriteMutationVariables = Exact<{
  id: Scalars["ID"];
  typename: Scalars["String"];
  appInfo: AppInfo;
}>;

export type LearnerUnFavouriteMutation = { __typename?: "Mutation" } & {
  learnerUnFavourite?: Maybe<
    { __typename?: "LearnerUnFavourite" } & Pick<LearnerUnFavourite, "ok"> & {
        item:
          | ({ __typename: "LearnerRecording" } & LearnerRecordingPartsFragment)
          | ({ __typename: "LearnerArticle" } & LearnerArticlePartsFragment)
          | ({
              __typename: "LearnerPractitioner";
            } & LearnerPractitionerPartsFragment);
      }
  >;
};

export type LearnerUpdateProfileSettingsMutationVariables = Exact<{
  input: LearnerUpdateProfileSettingsInput;
  appInfo: AppInfo;
}>;

export type LearnerUpdateProfileSettingsMutation = {
  __typename?: "Mutation";
} & {
  learnerUpdateProfileSettings?: Maybe<
    { __typename?: "LearnerUpdateProfileSettings" } & Pick<
      LearnerUpdateProfileSettings,
      "ok"
    > & {
        learner: { __typename?: "Learner" } & Pick<
          Learner,
          "firstName" | "lastName" | "fullName" | "photoUrl"
        > & {
            screens: { __typename?: "LearnerScreens" } & {
              profile: { __typename?: "LearnerProfileScreen" } & {
                settings?: Maybe<
                  { __typename?: "LearnerSettings" } & Pick<
                    LearnerSettings,
                    "title"
                  > & {
                      profile: {
                        __typename?: "LearnerProfileSettings";
                      } & LearnerProfileSettingsPartsFragment;
                    }
                >;
              };
            };
          };
      }
  >;
};

export type LearnerProfileSettingsPartsFragment = {
  __typename?: "LearnerProfileSettings";
} & Pick<LearnerProfileSettings, "title"> & {
    fields: { __typename?: "LearnerProfileSettingsFields" } & {
      photoUrl: { __typename?: "ImageInput" } & InputParts_ImageInput_Fragment;
      firstName: { __typename?: "TextInput" } & InputParts_TextInput_Fragment;
      lastName: { __typename?: "TextInput" } & InputParts_TextInput_Fragment;
      injuries: { __typename?: "TextInput" } & InputParts_TextInput_Fragment;
      birthday: { __typename?: "DateInput" } & InputParts_DateInput_Fragment;
      gender: { __typename?: "SelectInput" } & InputParts_SelectInput_Fragment;
    };
  };

export type LearnerUpdateNotificationSettingsToggleMutationVariables = Exact<{
  id: Scalars["ID"];
  checked: Scalars["Boolean"];
  appInfo: AppInfo;
}>;

export type LearnerUpdateNotificationSettingsToggleMutation = {
  __typename?: "Mutation";
} & {
  learnerUpdateNotificationSettingsToggle?: Maybe<
    { __typename?: "LearnerUpdateNotificationSettingsToggle" } & Pick<
      LearnerUpdateNotificationSettingsToggle,
      "ok"
    > & {
        learner: { __typename?: "Learner" } & {
          screens: { __typename?: "LearnerScreens" } & {
            profile: { __typename?: "LearnerProfileScreen" } & {
              settings?: Maybe<
                { __typename?: "LearnerSettings" } & {
                  notifications: {
                    __typename?: "LearnerNotificationsSettings";
                  } & {
                    toggles: Array<
                      {
                        __typename?: "BooleanInput";
                      } & BooleanInputPartsFragment
                    >;
                  };
                }
              >;
            };
          };
        };
      }
  >;
};

export type LearnerUpdateCalendarSettingsToggleMutationVariables = Exact<{
  id: Scalars["ID"];
  checked: Scalars["Boolean"];
  appInfo: AppInfo;
}>;

export type LearnerUpdateCalendarSettingsToggleMutation = {
  __typename?: "Mutation";
} & {
  learnerUpdateCalendarSettingsToggle?: Maybe<
    { __typename?: "LearnerUpdateCalendarSettingsToggle" } & Pick<
      LearnerUpdateCalendarSettingsToggle,
      "ok"
    > & {
        learner: { __typename?: "Learner" } & {
          screens: { __typename?: "LearnerScreens" } & {
            profile: { __typename?: "LearnerProfileScreen" } & {
              settings?: Maybe<
                { __typename?: "LearnerSettings" } & {
                  calendar: { __typename?: "LearnerCalendarSettings" } & {
                    toggles: Array<
                      {
                        __typename?: "BooleanInput";
                      } & BooleanInputPartsFragment
                    >;
                  };
                }
              >;
            };
          };
        };
      }
  >;
};

export type LearnerBiometricsConnectProviderMutationVariables = Exact<{
  id: Scalars["ID"];
  appInfo: AppInfo;
}>;

export type LearnerBiometricsConnectProviderMutation = {
  __typename?: "Mutation";
} & {
  learnerBiometricsConnectProvider?: Maybe<
    { __typename?: "LearnerBiometricsConnectProvider" } & Pick<
      LearnerBiometricsConnectProvider,
      "ok" | "vitalUserId" | "vitalLinkToken" | "vitalLinkUrl"
    > & {
        learner: { __typename?: "Learner" } & {
          screens: { __typename?: "LearnerScreens" } & {
            profile: { __typename?: "LearnerProfileScreen" } & {
              settings?: Maybe<
                { __typename?: "LearnerSettings" } & {
                  biometrics?: Maybe<
                    { __typename?: "LearnerBiometricsSettings" } & {
                      providers: {
                        __typename?: "LearnerBiometricsProviders";
                      } & Pick<LearnerBiometricsProviders, "title"> & {
                          providers: Array<
                            { __typename?: "LearnerBiometricsProvider" } & Pick<
                              LearnerBiometricsProvider,
                              "id" | "name"
                            >
                          >;
                        };
                    }
                  >;
                }
              >;
            };
          };
        };
      }
  >;
};

export type LearnerBiometricsReportMissingDeviceMutationVariables = Exact<{
  deviceName: Scalars["String"];
  appInfo: AppInfo;
}>;

export type LearnerBiometricsReportMissingDeviceMutation = {
  __typename?: "Mutation";
} & {
  learnerBiometricsReportMissingDevice?: Maybe<
    { __typename?: "LearnerBiometricsReportMissingDevice" } & Pick<
      LearnerBiometricsReportMissingDevice,
      "ok"
    >
  >;
};

export type LearnerBiometricsDisconnectProviderMutationVariables = Exact<{
  id: Scalars["ID"];
  appInfo: AppInfo;
}>;

export type LearnerBiometricsDisconnectProviderMutation = {
  __typename?: "Mutation";
} & {
  learnerBiometricsDisconnectProvider?: Maybe<
    { __typename?: "LearnerBiometricsDisconnectProvider" } & Pick<
      LearnerBiometricsDisconnectProvider,
      "ok"
    > & {
        learner: { __typename?: "Learner" } & {
          biometrics?: Maybe<
            { __typename?: "LearnerBiometrics" } & Pick<
              LearnerBiometrics,
              "hasHealthData"
            >
          >;
          screens: { __typename?: "LearnerScreens" } & {
            profile: { __typename?: "LearnerProfileScreen" } & {
              settings?: Maybe<
                { __typename?: "LearnerSettings" } & {
                  biometrics?: Maybe<
                    { __typename?: "LearnerBiometricsSettings" } & {
                      providers: {
                        __typename?: "LearnerBiometricsProviders";
                      } & Pick<LearnerBiometricsProviders, "title"> & {
                          providers: Array<
                            { __typename?: "LearnerBiometricsProvider" } & Pick<
                              LearnerBiometricsProvider,
                              "id" | "name"
                            >
                          >;
                        };
                    }
                  >;
                }
              >;
            };
          };
        };
      }
  >;
};

export type LearnerBiometricsDeleteHealthDataMutationVariables = Exact<{
  appInfo: AppInfo;
}>;

export type LearnerBiometricsDeleteHealthDataMutation = {
  __typename?: "Mutation";
} & {
  learnerBiometricsDeleteHealthData?: Maybe<
    { __typename?: "LearnerBiometricsDeleteHealthData" } & Pick<
      LearnerBiometricsDeleteHealthData,
      "ok"
    > & {
        learner: { __typename?: "Learner" } & {
          biometrics?: Maybe<
            { __typename?: "LearnerBiometrics" } & Pick<
              LearnerBiometrics,
              "hasHealthData"
            >
          >;
          screens: { __typename?: "LearnerScreens" } & {
            profile: { __typename?: "LearnerProfileScreen" } & {
              settings?: Maybe<
                { __typename?: "LearnerSettings" } & {
                  biometrics?: Maybe<
                    { __typename?: "LearnerBiometricsSettings" } & {
                      providers: {
                        __typename?: "LearnerBiometricsProviders";
                      } & Pick<LearnerBiometricsProviders, "title"> & {
                          providers: Array<
                            { __typename?: "LearnerBiometricsProvider" } & Pick<
                              LearnerBiometricsProvider,
                              "id" | "name"
                            >
                          >;
                        };
                    }
                  >;
                }
              >;
            };
          };
        };
      }
  >;
};

export type LearnerBiometricsDeviceConnectionQueryVariables = Exact<{
  appInfo: AppInfo;
}>;

export type LearnerBiometricsDeviceConnectionQuery = {
  __typename?: "Query";
} & {
  learnerBiometricsDeviceConnection: {
    __typename?: "LearnerBiometricsDeviceConnection";
  } & {
    intro: { __typename?: "LearnerBiometricsDeviceConnectionIntro" } & Pick<
      LearnerBiometricsDeviceConnectionIntro,
      "buttonText"
    > & {
        sections: Array<
          Maybe<
            {
              __typename?: "LearnerBiometricsDeviceConnectionIntroSection";
            } & Pick<
              LearnerBiometricsDeviceConnectionIntroSection,
              "title" | "contentHtml"
            >
          >
        >;
      };
    input: { __typename?: "SingleInputScreen" } & Pick<
      SingleInputScreen,
      "titleHtml" | "subtitleHtml" | "buttonText" | "skipButtonText"
    > & {
        input:
          | ({ __typename?: "SelectInput" } & Pick<
              SelectInput,
              "id" | "required"
            > & {
                options: Array<
                  { __typename: "SelectInputOption" } & Pick<
                    SelectInputOption,
                    "label" | "value"
                  >
                >;
              })
          | { __typename?: "MultiSelectInput" }
          | { __typename?: "TextInput" }
          | { __typename?: "DateInput" }
          | { __typename?: "BooleanInput" }
          | { __typename?: "RangeInput" }
          | { __typename?: "ImageInput" };
      };
    missingDeviceInput: { __typename?: "SingleInputScreen" } & Pick<
      SingleInputScreen,
      "titleHtml" | "subtitleHtml" | "buttonText" | "skipButtonText"
    > & {
        input:
          | { __typename?: "SelectInput" }
          | { __typename?: "MultiSelectInput" }
          | ({ __typename?: "TextInput" } & Pick<
              TextInput,
              "id" | "label" | "required" | "minLength" | "maxLength"
            >)
          | { __typename?: "DateInput" }
          | { __typename?: "BooleanInput" }
          | { __typename?: "RangeInput" }
          | { __typename?: "ImageInput" };
      };
    ready: { __typename?: "LearnerBiometricsDeviceConnectionReady" } & Pick<
      LearnerBiometricsDeviceConnectionReady,
      "title" | "contentHtml" | "buttonText"
    >;
  };
};

export type LearnerBiometricsModalTellMeMoreMutationVariables = Exact<{
  appInfo: AppInfo;
}>;

export type LearnerBiometricsModalTellMeMoreMutation = {
  __typename?: "Mutation";
} & {
  learnerBiometricsModalTellMeMore?: Maybe<
    { __typename?: "LearnerBiometricsModalTellMeMore" } & {
      learner: { __typename?: "Learner" } & {
        biometrics?: Maybe<
          { __typename?: "LearnerBiometrics" } & {
            modal?: Maybe<
              { __typename?: "LearnerBiometricsModal" } & Pick<
                LearnerBiometricsModal,
                | "title"
                | "contentHtml"
                | "tellMeMoreButtonText"
                | "remindMeLaterButtonText"
                | "dontAskAgainButtonText"
              >
            >;
          }
        >;
      };
    }
  >;
};

export type LearnerBiometricsModalRemindMeLaterMutationVariables = Exact<{
  appInfo: AppInfo;
}>;

export type LearnerBiometricsModalRemindMeLaterMutation = {
  __typename?: "Mutation";
} & {
  learnerBiometricsModalRemindMeLater?: Maybe<
    { __typename?: "LearnerBiometricsModalRemindMeLater" } & {
      learner: { __typename?: "Learner" } & {
        biometrics?: Maybe<
          { __typename?: "LearnerBiometrics" } & {
            modal?: Maybe<
              { __typename?: "LearnerBiometricsModal" } & Pick<
                LearnerBiometricsModal,
                | "title"
                | "contentHtml"
                | "tellMeMoreButtonText"
                | "remindMeLaterButtonText"
                | "dontAskAgainButtonText"
              >
            >;
          }
        >;
      };
    }
  >;
};

export type LearnerBiometricsModalDontAskAgainMutationVariables = Exact<{
  appInfo: AppInfo;
}>;

export type LearnerBiometricsModalDontAskAgainMutation = {
  __typename?: "Mutation";
} & {
  learnerBiometricsModalDontAskAgain?: Maybe<
    { __typename?: "LearnerBiometricsModalDontAskAgain" } & {
      learner: { __typename?: "Learner" } & {
        biometrics?: Maybe<
          { __typename?: "LearnerBiometrics" } & {
            modal?: Maybe<
              { __typename?: "LearnerBiometricsModal" } & Pick<
                LearnerBiometricsModal,
                | "title"
                | "contentHtml"
                | "tellMeMoreButtonText"
                | "remindMeLaterButtonText"
                | "dontAskAgainButtonText"
              >
            >;
          }
        >;
      };
    }
  >;
};
