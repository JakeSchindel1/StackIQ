import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  collection,
  query,
  where,
  getDocs,
  Timestamp 
} from 'firebase/firestore';

const STORAGE_KEYS = {
  USER_PROFILE: 'user_profile',
  SUPPLEMENT_STACKS: 'supplement_stacks',
  LAST_SYNC: 'last_sync_timestamp'
} as const;

interface SupplementStack {
  AM: Supplement[];
  PM: Supplement[];
  FLEX: Supplement[];
  lastUpdated: string;
}

interface Supplement {
  id: string;
  name: string;
  baseScore: number;
  timing: TimeOfDay;
  dosage: string;
  notes?: string;
}

type TimeOfDay = 'AM' | 'PM' | 'FLEX';

class SupplementStorageService {
  private db: any;
  private userId: string | null = null;

  constructor(firebaseConfig: any) {
    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
  }

  setUserId(userId: string | null) {
    this.userId = userId;
  }

  async saveSupplementStack(stack: SupplementStack): Promise<void> {
    try {
      // Always save locally first (offline-first approach)
      await this.saveLocal(STORAGE_KEYS.SUPPLEMENT_STACKS, stack);

      // If user is authenticated, sync to cloud
      if (this.userId) {
        await this.saveToCloud(stack);
      }
    } catch (error) {
      console.error('Error saving supplement stack:', error);
      throw error;
    }
  }

  async loadSupplementStack(): Promise<SupplementStack | null> {
    try {
      if (this.userId) {
        // Try loading from cloud first for authenticated users
        const cloudData = await this.loadFromCloud();
        if (cloudData) {
          // Update local storage with cloud data
          await this.saveLocal(STORAGE_KEYS.SUPPLEMENT_STACKS, cloudData);
          return cloudData;
        }
      }

      // Fall back to local storage
      return await this.loadLocal(STORAGE_KEYS.SUPPLEMENT_STACKS);
    } catch (error) {
      console.error('Error loading supplement stack:', error);
      throw error;
    }
  }

  async syncWithCloud(): Promise<void> {
    if (!this.userId) {
      throw new Error('Cannot sync with cloud: User not authenticated');
    }

    try {
      const localData = await this.loadLocal(STORAGE_KEYS.SUPPLEMENT_STACKS);
      const cloudData = await this.loadFromCloud();

      if (!localData && !cloudData) {
        return; // Nothing to sync
      }

      // Merge data based on timestamps
      const mergedData = this.mergeData(localData, cloudData);
      
      // Save merged data both locally and to cloud
      await this.saveLocal(STORAGE_KEYS.SUPPLEMENT_STACKS, mergedData);
      await this.saveToCloud(mergedData);
      
      // Update last sync timestamp
      await this.saveLocal(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    } catch (error) {
      console.error('Error syncing with cloud:', error);
      throw error;
    }
  }

  private async saveLocal(key: string, data: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to local storage:', error);
      throw error;
    }
  }

  private async loadLocal(key: string): Promise<any> {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading from local storage:', error);
      throw error;
    }
  }

  private async saveToCloud(data: SupplementStack): Promise<void> {
    if (!this.userId) {
      throw new Error('Cannot save to cloud: User not authenticated');
    }

    try {
      await setDoc(doc(this.db, 'supplementStacks', this.userId), {
        ...data,
        lastUpdated: Timestamp.now()
      });
    } catch (error) {
      console.error('Error saving to cloud:', error);
      throw error;
    }
  }

  private async loadFromCloud(): Promise<SupplementStack | null> {
    if (!this.userId) {
      return null;
    }

    try {
      const docRef = doc(this.db, 'supplementStacks', this.userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        // Convert Firestore Timestamp to ISO string
        return {
          ...data,
          lastUpdated: data.lastUpdated.toDate().toISOString()
        } as SupplementStack;
      }

      return null;
    } catch (error) {
      console.error('Error loading from cloud:', error);
      throw error;
    }
  }

  private mergeData(local: SupplementStack | null, cloud: SupplementStack | null): SupplementStack {
    if (!local) return cloud!;
    if (!cloud) return local;

    const localDate = new Date(local.lastUpdated);
    const cloudDate = new Date(cloud.lastUpdated);

    // Use the more recent data
    return localDate > cloudDate ? local : cloud;
  }
}

export default SupplementStorageService;