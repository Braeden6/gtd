import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectCreate, ProjectResponse, ProjectService } from '@/api/generated';
import { ItemType, KabanItem } from '@/lib/types';

export function useProjectItems() {
  const queryClient = useQueryClient();

  const { 
    data: projects = [], 
    isLoading,
    isError,
    error 
  } = useQuery({
    queryKey: ['project'],
    queryFn: () => ProjectService.getUserProjectsProjectGet(),
    refetchInterval: 5000000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 5000000,
  });

  const createMutation = useMutation({
    mutationFn: (project: ProjectCreate) => 
      ProjectService.createProjectProjectPost(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => ProjectService.deleteProjectProjectActionIdDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project'] });
    },
  });

  const addProject = async (project: ProjectCreate) => {
    if (!project.title.trim()) return;
    return createMutation.mutateAsync(project);
  };

  const deleteProject = async (id: string) => {
    return deleteMutation.mutateAsync(id);
  };

  const projectItemToKabanItem = (item: ProjectResponse): KabanItem => {
    return {
      id: item.id,
      title: item.title,
      priority: item.priority,
      date: item.due_date,
      type: ItemType.PROJECT,
    };
  }
  
  return {
    projects,
    kanbanProjects: projects.map(projectItemToKabanItem),
    isLoading,
    isError,
    error,
    addProject,
    deleteProject,
    isAddingProject: createMutation.isPending,
    isDeletingProject: deleteMutation.isPending
  };
}