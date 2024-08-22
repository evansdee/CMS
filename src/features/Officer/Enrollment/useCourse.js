import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addUpdateCourse,
  deleteCourse,
  getCourse,
  updateCourseCount,
} from "../../../service/apiCourse";
import toast from "react-hot-toast";

export function useCourse() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["course"],
    queryFn: getCourse,
  });

  return { data, isLoading, error };
}

export function useAddCourse() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: addUpdateCourse,
    onSuccess: () => {
      toast.success("Course Awaiting Validation");
      queryClient.invalidateQueries({ queryKey: ["course"] });
    },
  });

  return { mutate, isPending, error };
}

export function useUpdateCourseCount() {
  const queryClient = useQueryClient();
  const {
    mutate: updateCount,
    data,
    isPending: isCounting,
    error,
  } = useMutation({
    mutationFn: updateCourseCount,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["count"] }),
  });

  return { data, updateCount, isCounting, error };
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  const {
    mutate,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      toast.success("Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["course"] });
    },
  });

  return { mutate, isDeleting, error };
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ newCourse, id }) => addUpdateCourse(newCourse, id),
    onSuccess: (data) => {
      toast.success(`${data.courseCode} has been Approved Successfully`);
      queryClient.invalidateQueries({ queryKey: ["course"] });
    },

    onError: () => toast.error("failed to approve"),
  });

  return { mutate, isPending, error };
}
