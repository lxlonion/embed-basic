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

my code
import { useState, useEffect, useRef } from 'react';

function getLocalStorage(key: string): string | null {
  return localStorage.getItem(key);
}

async function getLoggedUserInfo() {
  const authToken = getLocalStorage('_a_ltk_');
  if (!authToken) {
    throw new Error('Authorization token not found in localStorage.');
  }

  const response = await fetch('/answer/api/v1/user/info', {
    headers: {
      Authorization: authToken,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseData.data; // 返回 data 字段
}

function ExcalidrawEmbed() {
  const [userInfo, setUserInfo] = useState(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadingRef.current) {
      return;
    }

    getLoggedUserInfo()
      .then((res) => {
        setUserInfo(res);
        if (loadingRef.current) {
          loadingRef.current.remove();
        }
      })
      .catch((err) => {
        console.error('获取用户信息失败', err);
        if (loadingRef.current) {
          loadingRef.current.remove();
        }
      });
  }, []);

  return (
    <div>
      {userInfo ? (
        <>
          <p>欢迎，{userInfo.display_name}!</p>
          <p>您的邮箱: {userInfo.e_mail}</p>
        </>
      ) : (
        <div
          ref={loadingRef}
          className="loading position-absolute top-0 left-0 w-100 h-100 z-1 bg-white d-flex justify-content-center align-items-center"
        >
          加载中...
        </div>
      )}
    </div>
  );
}

export default ExcalidrawEmbed;
