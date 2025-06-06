
import { TrendingUp, Home, Upload, BarChart3, Shield, FileText, Bot, Settings, Bell, User } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const portfolioItems = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Data Upload', url: '/upload', icon: Upload },
];

const analysisItems = [
  { title: 'Scenario Modeling', url: '/scenarios', icon: BarChart3 },
  { title: 'Risk & Compliance', url: '/risk-compliance', icon: Shield },
];

const reportingItems = [
  { title: 'Reports', url: '/reports', icon: FileText },
  { title: 'AI Assistant', url: '/ai-assistant', icon: Bot },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  const isActive = (path: string) => location.pathname === path;

  const getNavClassName = (path: string) => {
    return isActive(path)
      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900';
  };

  return (
    <Sidebar 
      className="border-r border-gray-200"
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-gray-200 p-2">
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : ''}>
            Portfolio
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {portfolioItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={getNavClassName(item.url)}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : ''}>
            Analysis
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analysisItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={getNavClassName(item.url)}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : ''}>
            Reporting
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {reportingItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={getNavClassName(item.url)}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <NavLink to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="text-gray-600 hover:bg-gray-50"
              tooltip={isCollapsed ? "Notifications" : undefined}
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="text-gray-600 hover:bg-gray-50"
              tooltip={isCollapsed ? "Settings" : undefined}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="text-gray-600 hover:bg-gray-50"
              tooltip={isCollapsed ? "John Anderson" : undefined}
            >
              <User className="h-4 w-4" />
              <span>John Anderson</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
