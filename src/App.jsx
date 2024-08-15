import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import GlobalStyles from "./styles/GlobalStyle";
import { TestProvider } from "./hook/useTest";
import { DarkModeProvider } from "./hook/DarkModeToggle";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Report from "./pages/Report";
import StudentPage from "./pages/StudentPage";
import Enrollment from "./pages/Enrollment";
import Applayout from "./pages/Applayout";
import Session from "./pages/Session";
import Setting from "./pages/Setting";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import RoleSideBarContent from "./context/RoleSideBarContent";
import EnrollmentListContext from "./hook/EnrollmentListContext";
import EnrollmentsContext from "./hook/EnrollmentsContext";
import ToggleProvider from "./hook/useMenuToggle";
import Approval from "./pages/Approval";
import Signature from "./pages/Signature";
import Student from "./features/Officer/Student/Student";
import ReportDataProvider from "./features/Officer/Report/ReportDataContext";
import CertificatePage from "./pages/CertificatePage";
import CertificateList from "./features/Officer/Certificate/CertificateList";
import CertificateSearch from "./features/Officer/Certificate/CertificateSearch";
import CertificatePrint from "./features/Officer/Certificate/CertificatePrint";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

//  COPY THE APPLAYOUT GRID CSS TO CHAT GPT TO GIVE YOU A MOBILE VERSION CSS

function App() {
  return (
    <>
      <ToggleProvider>
        <DarkModeProvider>
          <TestProvider>
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />

              <GlobalStyles />

              <BrowserRouter>
                <Routes>
                  <Route path="login" element={<Login />} />
                  <Route
                    // path="/applayout"
                    element={
                      <ProtectedRoute>
                        <EnrollmentsContext>
                          <ReportDataProvider>
                            <EnrollmentListContext>
                              <RoleSideBarContent>
                                <Applayout />
                              </RoleSideBarContent>
                            </EnrollmentListContext>
                          </ReportDataProvider>
                        </EnrollmentsContext>
                      </ProtectedRoute>
                    }
                  >
                    <Route
                      index
                      element={<Navigate replace to="dashboard" />}
                    />
                    <Route path="dashboard" element={<Dashboard />}>
                      <Route index element={<Navigate replace to="home" />} />
                      <Route path="home" element={<Home />} />
                      <Route path="session" element={<Session />} />
                      <Route path="student" element={<StudentPage />} />
                      <Route path="report" element={<Report />} />
                      <Route path="enrollment" element={<Enrollment />} />
                      <Route path="settings" element={<Setting />} />
                      <Route path="certificate" element={<CertificatePage />}>
                        <Route index element={<Navigate replace to="list" />} />
                        <Route path="list" element={<CertificateList />} />
                        <Route path="search" element={<CertificateSearch />} />
                      </Route>
                      <Route path="certificate/:id" element={<CertificatePrint />} />

                      <Route path="approval" element={<Approval />} />
                      <Route path="signature" element={<Signature />} />
                    </Route>
                  </Route>
                  <Route path="test" element={<Test />} />
                  <Route path="*" element={<NoPage />} />
                </Routes>
              </BrowserRouter>

              <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                  success: {
                    duration: 3000,
                  },
                  error: {
                    duration: 5000,
                  },
                  style: {
                    fontSize: "16px",
                    maxWidth: "500px",
                    padding: "16px 24px",
                    backgroundColor: "var(--color-white)",
                    // backgroundColor: "var(--color-toaster-background)",
                    color: "var(--color-black)",
                  },
                }}
              />
            </QueryClientProvider>
          </TestProvider>
        </DarkModeProvider>
      </ToggleProvider>
    </>
  );
}

export default App;
