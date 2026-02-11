export enum Tab {
  DASHBOARD = 'dashboard',
  FOCUS = 'focus',
  INSIGHTS = 'insights',
  PROFILE = 'profile',
  CMF = 'cmf'
}

export interface PostureData {
  time: string;
  score: number;
}

export interface StatDistribution {
  name: string;
  value: number;
  color: string;
}

export enum PostureState {
  GOOD = '坐姿端正',
  LEANING_LEFT = '向左倾斜',
  LEANING_RIGHT = '向右倾斜',
  SLOUCHING = '严重葛优瘫'
}

export interface PetState {
  mood: 'happy' | 'sad' | 'neutral' | 'eating';
  level: number;
  exp: number;
}