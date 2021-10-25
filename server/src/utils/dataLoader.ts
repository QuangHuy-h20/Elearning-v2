import { User } from "../entites/User";
import DataLoader from "dataloader";
import { Enroll } from "../entites/Enroll";
import { In } from "typeorm";
import { Course } from "../entites/Course";

interface EnrollConditions {
  courseId: number;
  userId: number;
}

const batchGetUsers = async (userIds: number[]) => {
  const users = await User.findByIds(userIds);
  return userIds.map((userId) => users.find((user) => user.id === userId));
};

const batchGetEnrollTypes = async (enrollConditions: EnrollConditions[]) => {
  const enrollTypes = await Enroll.findByIds(enrollConditions);
  return enrollConditions.map((enrollCondition) =>
    enrollTypes.find(
      (enrollType) =>
        enrollType.courseId === enrollCondition.courseId &&
        enrollType.userId === enrollCondition.userId
    )
  );
};

const batchGetCourses = async (courseIds: number[]) => {
  const coursesEnrolled = await Enroll.find({
    join: {
      alias: "enroll",
      innerJoinAndSelect: {
        course: "enroll.course",
      },
    },
    where: {
      userId: In(courseIds),
    },
  });

  const userIdToCourses: { [key: number]: Course[] } = {};

  coursesEnrolled.forEach((course) => {
    if (course.userId in userIdToCourses) {
      userIdToCourses[course.userId].push((course as any).__course__);
    } else {
      userIdToCourses[course.userId] = [(course as any).__course__];
    }
  });
  return courseIds.map(courseId => userIdToCourses[courseId])
};

export const buildDataLoaders = () => ({
  userLoader: new DataLoader<number, User | undefined>((userIds) =>
    batchGetUsers(userIds as number[])
  ),
  courseLoader: new DataLoader((courseIds) =>
    batchGetCourses(courseIds as number[])
  ),
  enrollLoader: new DataLoader<EnrollConditions, Enroll | undefined>(
    (enrollConditions) =>
      batchGetEnrollTypes(enrollConditions as EnrollConditions[])
  ),
});
