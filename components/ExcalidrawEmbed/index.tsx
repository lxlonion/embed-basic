/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// import EmbedContainer from '../EmbedContainer';

// const ExcalidrawEmbed = ({ excalidrawId }) => {
//   return (
//     <EmbedContainer height={380}>
//       <iframe
//         title="Excalidraw"
//         width="100%"
//         height="100%"
//         src={`https://excalidraw.com/${excalidrawId}/embed`}
//         frameBorder="0"
//       />
//     </EmbedContainer>
//   );
// };

// export default ExcalidrawEmbed;

import { getLoggedUserInfo } from '@/services';
import { useState, useEffect } from 'react';

function ExcalidrawEmbed() {
  const [userInfo, setUserInfo] = useState(null);
  
  useEffect(() => {
    // 调用API获取用户信息
    getLoggedUserInfo().then((res) => {
      setUserInfo(res);
    }).catch(err => {
      console.error("获取用户信息失败", err);
    });
  }, []);
  
  if (!userInfo) {
    return <div>加载中...</div>;
  }
  
  return (
    <div>
      <p>欢迎，{userInfo.username}!</p>
      <p>您的邮箱: {userInfo.e_mail}</p>
    </div>
  );
}

export default ExcalidrawEmbed;