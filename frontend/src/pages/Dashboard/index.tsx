import { Card } from '@/components/ui/card';

export default function Dashboard() {
  return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your GTD workspace</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Inbox Card */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Inbox</h2>
            <div className="text-3xl font-bold text-primary">5</div>
            <p className="text-sm text-muted-foreground">Items need processing</p>
          </Card>

          {/* Today's Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Today</h2>
            <div className="space-y-2">
              {/* Example tasks */}
              <div className="text-sm">📝 Review project proposal</div>
              <div className="text-sm">📞 Call client about meeting</div>
            </div>
          </Card>

          {/* Active Projects */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Active Projects</h2>
            <div className="text-3xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Projects in progress</p>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Example activities */}
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <div className="font-medium">Completed task: Update documentation</div>
                <div className="text-muted-foreground">2 hours ago</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <div className="font-medium">Added new project: Website Redesign</div>
                <div className="text-muted-foreground">5 hours ago</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
  );
}