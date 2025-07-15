
export interface Document {
  name: string;
  status: 'pending' | 'uploaded' | 'approved' | 'rejected';
  required: boolean;
  file?: File;
  uploadDate?: string;
  rejectionReason?: string;
}
