import { Outlet, Route, Routes } from "react-router"
import { CaseList } from "../cases/CaseList.js"
import { CaseSearch } from "../cases/CaseSearch.js"


export const ApplicationViews = () => {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<h1 className="title--main">CaseTracker 5000</h1>
							<div>Track Daily. Report <span className="title--main--span">Instantly.</span></div>

							<Outlet />
						</>
					}>
						<Route path="cases" element={
							<>
							<CaseSearch />
							<CaseList />
							</>
						}
						/>
					<Route path="cases" element={ <CaseList />} />
					{/* <Route path="case/create" element={<CaseForm />} />
					<Route path="resources" element={<Resources />} />
					<Route path="contacts" element={<Contacts />} />
					<Route path="case1001" element={<case1001 />} /> */}
				</Route>
			</Routes>
		</>
	)
}

