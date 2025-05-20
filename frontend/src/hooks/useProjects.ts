import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProjectCreate, ProjectResponse, ProjectService, ProjectUpdate } from '@/api/generated';
import { ItemType, KabanItem } from '@/lib/types';

const QUERY_CLIENT_KEY = 'project';

export function useProjects() {
  const queryClient = useQueryClient();

  const { 
    data: projects = [], 
    isLoading,
    isError,
    error 
  } = useQuery({
    queryKey: ['project'],
    queryFn: () => ProjectService.searchProjectsProjectSearchPost({
  }),
    refetchInterval: 50000,//1000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    staleTime: 50000, //1000
  });

  const createMutation = useMutation({
    mutationFn: (project: ProjectCreate) => 
      ProjectService.createProjectProjectPost(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_CLIENT_KEY] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => ProjectService.deleteProjectProjectProjectIdDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_CLIENT_KEY] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, project }: { id: string; project: ProjectUpdate }) => 
      ProjectService.updateProjectProjectProjectIdPut(id, project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_CLIENT_KEY] });
    },
  });
  
  const updateProject = async (id: string, project: ProjectUpdate) => {
    return updateMutation.mutateAsync({ id, project });
  };

  const addProject = async (project: ProjectCreate) => {
    return createMutation.mutateAsync(project);
  };

  const deleteProject = async (id: string) => {
    return deleteMutation.mutateAsync(id);
  };

  const projectToKabanItem = (project: ProjectResponse): KabanItem => {
    return {
      id: project.id,
      title: project.title,
      date: project.due_date,
      type: ItemType.PROJECT
    };
  }

  return {
    projects,
    kanbanProjects: projects.map(projectToKabanItem),
    isLoading,
    isError,
    error,
    updateProject,
    addProject,
    deleteProject,
    isAddingProject: createMutation.isPending,
    isDeletingProject: deleteMutation.isPending
  };
}