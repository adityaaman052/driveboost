export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-10 shadow-xl">
        <h1 className="mb-4 text-4xl font-bold">
          DriveBoost User Guide
        </h1>

        <p className="mb-10 text-gray-600">
          Toyota Sales Incentive
          Management System
        </p>

        <div className="space-y-10">
          <div>
            <h2 className="mb-4 text-2xl font-bold">
              Admin Workflow
            </h2>

            <div className="space-y-3 text-gray-700">
              <p>
                • Login and select
                Admin role.
              </p>

              <p>
                • Access the Admin
                Dashboard for sales
                analytics and reports.
              </p>

              <p>
                • Add or manage Toyota
                car models.
              </p>

              <p>
                • Configure incentive
                slabs based on sales
                ranges.
              </p>

              <p>
                • View monthly sales
                reports submitted by
                sales officers.
              </p>

              <p>
                • Analyze total sales
                performance using
                charts and dashboard
                metrics.
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold">
              Sales Officer Workflow
            </h2>

            <div className="space-y-3 text-gray-700">
              <p>
                • Login and select
                Sales Officer role.
              </p>

              <p>
                • Select a month and
                year for sales entry.
              </p>

              <p>
                • Enter quantities sold
                for different Toyota
                models.
              </p>

              <p>
                • View automatic
                incentive calculations
                based on configured
                slabs.
              </p>

              <p>
                • Save monthly sales
                data securely.
              </p>

              <p>
                • Access previous sales
                history anytime.
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold">
              Key Features
            </h2>

            <div className="space-y-3 text-gray-700">
              <p>
                • Clerk Authentication
              </p>

              <p>
                • Role-Based Access
                Control (RBAC)
              </p>

              <p>
                • Monthly Sales
                Tracking
              </p>

              <p>
                • Incentive Calculation
                Engine
              </p>

              <p>
                • Admin Analytics &
                Reports
              </p>

              <p>
                • Persistent Database
                Storage with PostgreSQL
              </p>

              <p>
                • Prisma ORM
              </p>

              <p>
                • Responsive Dashboard
                UI
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}